import type { NextApiRequest, NextApiResponse } from 'next';
import { categoryMap } from 'types/CategoriesContact';
import type { ContactFormData } from 'types/Contact';
import { jotformContactRatelimit } from 'lib/ratelimit';
import { validateCalStateEmail } from 'lib/api';
import {
  sendFeedbackNotifications,
  sendFeedbackEmailFailureAlert,
} from 'lib/feedbackNotifications';

const CONTACT_API_KEY = process.env.CONTACT_JOTFORM_API_KEY!;
const CONTACT_FORM_ID = process.env.CONTACT_JOTFORM_FORM_ID!;
const JOTFORM_BASE_URL = 'https://api.jotform.com';
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY!;

export function sanitize(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, maxLength);
}

export function validateContactForm(
  body: unknown,
): { ok: true; data: ContactFormData } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  if (typeof body !== 'object' || body === null) {
    return { ok: false, errors: ['Invalid request body.'] };
  }

  const requestBody = body as Partial<ContactFormData>;

  const firstName = sanitize(requestBody.firstName, 100);
  const lastInitial = sanitize(requestBody.lastInitial, 10);
  const email = sanitize(requestBody.email, 200);
  const subject = sanitize(requestBody.subject, 200);
  const message = sanitize(requestBody.message, 2000);
  const category = sanitize(requestBody.category, 50);
  const captchaToken =
    typeof requestBody.captchaToken === 'string'
      ? requestBody.captchaToken.trim()
      : '';

  if (!email) errors.push('Email is required.');
  if (!subject) errors.push('Subject is required.');
  if (!message) errors.push('Message is required.');
  if (!category) errors.push('Category is required.');
  if (!captchaToken) errors.push('CAPTCHA token is required.');

  if (email) {
    const emailError = validateCalStateEmail(email);
    if (emailError) errors.push(emailError);
  }
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
      captchaToken,
    },
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!CONTACT_API_KEY || !CONTACT_FORM_ID || !RECAPTCHA_SECRET_KEY) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (typeof req.body?.website === 'string' && req.body.website.trim()) {
    return res.status(200).json({ success: true });
  }

  const xf = req.headers['x-forwarded-for'];
  const ip =
    (Array.isArray(xf) ? xf[0] : xf)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  try {
    const result = validateContactForm(req.body);

    if (!result.ok) {
      return res.status(400).json({
        error: 'Invalid form data',
        details: result.errors,
      });
    }

    const formData = result.data;
    const captchaResult = await verifyRecaptcha(formData.captchaToken!);

    if (!captchaResult.success) {
      console.error('CAPTCHA verification failed:', captchaResult);
      return res.status(400).json({
        error: 'CAPTCHA verification failed',
      });
    }

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

    const jotformUrl = `${JOTFORM_BASE_URL}/form/${CONTACT_FORM_ID}/submissions`;

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
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        APIKEY: CONTACT_API_KEY,
      },
      body,
    });

    const jotJson = await jotResponse.json();

    if (!jotResponse.ok) {
      console.error('Submission failed:', jotJson);
      return res.status(500).json({
        error: 'Failed to submit form. Please try again.',
      });
    }

    // The submission is now recorded in Jotform. Jotform's API doesn't fire its
    // automailer, so we send the notification + confirmation ourselves. A mail
    // failure must not fail the request — the feedback is already saved.
    try {
      await sendFeedbackNotifications(formData);
    } catch (emailError) {
      // Searchable tag so these are easy to filter in Vercel logs. The
      // submission is already saved in Jotform, so we log loudly rather than
      // failing the request.
      console.error(
        '[FEEDBACK_EMAIL_FAILED]',
        JSON.stringify({
          email: formData.email,
          subject: formData.subject,
          category: formData.category,
          error:
            emailError instanceof Error
              ? emailError.message
              : String(emailError),
          stack: emailError instanceof Error ? emailError.stack : undefined,
        }),
      );
      // Push a Slack alert over a channel independent of Resend. Best-effort:
      // the structured log above is the catch-all if this also fails.
      await sendFeedbackEmailFailureAlert(formData, emailError);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error submitting form:', error);
    return res
      .status(500)
      .json({ error: 'Failed to submit form. Please try again.' });
  }
}

const verifyRecaptcha = async (token: string) => {
  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }).toString(),
    },
  );

  return response.json();
};
