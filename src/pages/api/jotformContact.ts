// pages/api/jotformContact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { categoryMap } from 'types/CategoriesContact';
import type { ContactFormData } from 'types/Contact';
import { jotformContactRatelimit } from 'lib/ratelimit';

const CONTACT_API_KEY = process.env.CONTACT_JOTFORM_API_KEY!;
const CONTACT_FORM_ID = process.env.CONTACT_JOTFORM_FORM_ID!;
const JOTFORM_BASE_URL = 'https://api.jotform.com';

// Simple sanitizer: make sure it's a string, trim spaces, and clamp length.
function sanitize(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, maxLength);
}

// Runtime validation + sanitization
function validateContactForm(
  body: unknown,
): { ok: true; data: ContactFormData } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  if (typeof body !== 'object' || body === null) {
    return { ok: false, errors: ['Invalid request body.'] };
  }

  const raw = body as Partial<ContactFormData>;

  const firstName = sanitize(raw.firstName, 100);
  const lastInitial = sanitize(raw.lastInitial, 10);
  const email = sanitize(raw.email, 200);
  const subject = sanitize(raw.subject, 200);
  const message = sanitize(raw.message, 2000);
  const category = sanitize(raw.category, 50);

  // Required field checks
  if (!email) errors.push('Email is required.');
  if (!subject) errors.push('Subject is required.');
  if (!message) errors.push('Message is required.');
  if (!category) errors.push('Category is required.');

  // Email simple format check
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    errors.push('Email is invalid.');
  }

  // Category must be one of the defined strings
  const allowedCategories = Object.keys(categoryMap);
  if (category && !allowedCategories.includes(category)) {
    errors.push('Category is invalid.');
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastInitial,
      email,
      subject,
      message,
      category,
    },
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!CONTACT_API_KEY || !CONTACT_FORM_ID) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const xf = req.headers['x-forwarded-for'];
  const ip =
    (Array.isArray(xf) ? xf[0] : xf)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  try {
    // Validate + sanitize body
    const result = validateContactForm(req.body);

    if (!result.ok) {
      return res.status(400).json({
        error: 'Invalid form data',
        details: result.errors,
      });
    }

    const formData = result.data;

    // ✅ Rate limit ONCE, using best identifier
    const email = (formData.email || '').toLowerCase();
    const identifier = email ? `${ip}:${email}` : ip;

    const { success, limit, remaining, reset } =
      await jotformContactRatelimit.limit(identifier);

    res.setHeader('X-RateLimit-Limit', String(limit));
    res.setHeader('X-RateLimit-Remaining', String(remaining));
    res.setHeader('X-RateLimit-Reset', String(reset));

    if (!success) {
      return res.status(429).json({
        error: 'Too many submissions. Please try again later.',
      });
    }

    // Build Jotform API URL
    const jotformUrl = `${JOTFORM_BASE_URL}/form/${CONTACT_FORM_ID}/submissions?apiKey=${CONTACT_API_KEY}`;

    const body = new URLSearchParams();
    body.append('submission[2][first]', formData.firstName || '');
    body.append('submission[2][last]', formData.lastInitial || '');
    body.append('submission[3]', formData.email || '');
    body.append('submission[4]', formData.subject || '');

    const readableCategory =
      categoryMap[formData.category] || formData.category;
    body.append('submission[5]', readableCategory);
    body.append('submission[6]', formData.message || '');

    const jotResponse = await fetch(jotformUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    const jotJson = await jotResponse.json();

    if (!jotResponse.ok) {
      return res.status(jotResponse.status).json({
        error: jotJson?.message || 'Jotform submission failed',
        jotform: jotJson,
      });
    }

    return res.status(200).json({ success: true, jotform: jotJson });
  } catch (error) {
    console.error('Error posting to Jotform:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
