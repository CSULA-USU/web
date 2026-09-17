import type { NextApiRequest, NextApiResponse } from 'next';
import { categoryMap } from 'types/CategoriesContact';
import type { ContactFormData } from 'types/Contact';
import {
  checkRateLimit,
  jotformContactIpRatelimit,
  jotformContactRatelimit,
} from 'lib/ratelimit';
import { validateEmail } from 'lib/api';
import {
  sendFeedbackNotifications,
  sendFeedbackEmailFailureAlert,
} from 'lib/feedbackNotifications';

const CONTACT_API_KEY = process.env.CONTACT_JOTFORM_API_KEY!;
const CONTACT_FORM_ID = process.env.CONTACT_JOTFORM_FORM_ID!;
const JOTFORM_BASE_URL = 'https://api.jotform.com';

/**
 * Floor on how long filling this form can plausibly take. Six fields, one of
 * them a message body — a person needs seconds, a script needs none.
 *
 * Generous on purpose: the cost of setting it too high is silently rejecting
 * real feedback, and a false positive here is self-correcting anyway, because
 * retyping a submission takes longer than the threshold.
 */
export const MIN_FORM_FILL_MS = 3000;

export function sanitize(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, maxLength);
}

/**
 * True when a submission arrived faster than a person could have produced it,
 * or without the timing the real form always sends.
 *
 * This is a speed bump of the same class as the honeypot, not a wall: the value
 * is client-supplied, so anything willing to fake it gets through. It exists to
 * catch the scripted POST that fills every field instantly and the crafted
 * request that does not know the field is expected — which between them are
 * most of what actually reaches a form like this.
 */
export const isTooFastToBeHuman = (durationMs: unknown): boolean => {
  if (typeof durationMs !== 'number' || !Number.isFinite(durationMs)) {
    return true;
  }
  return durationMs < MIN_FORM_FILL_MS;
};

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

  if (!email) errors.push('Email is required.');
  if (!subject) errors.push('Subject is required.');
  if (!message) errors.push('Message is required.');
  if (!category) errors.push('Category is required.');

  if (email) {
    const emailError = validateEmail(email);
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

  /* A filled honeypot is definitively a bot, so it gets a fake success — there
     is nothing to tell a bot, and a real error would teach it what to avoid. */
  if (typeof req.body?.website === 'string' && req.body.website.trim()) {
    return res.status(200).json({ success: true });
  }

  /* Unlike the honeypot, a fast submission is only probably a bot, so this
     answers honestly rather than silently dropping what might be real
     feedback. A person who somehow trips it can simply submit again. */
  if (isTooFastToBeHuman(req.body?.formFillDurationMs)) {
    return res.status(400).json({
      error: 'That was submitted too quickly. Please try again.',
    });
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

    const email = (formData.email || '').toLowerCase();
    const identifier = email ? `${ip}:${email}` : ip;

    const perSubmitter = await checkRateLimit(
      jotformContactRatelimit,
      identifier,
    );

    /* Absent while degraded — advertising a ceiling the limiter is not actually
       enforcing would be worse than saying nothing. */
    if (!perSubmitter.degraded) {
      res.setHeader('X-RateLimit-Limit', String(perSubmitter.limit));
      res.setHeader('X-RateLimit-Remaining', String(perSubmitter.remaining));
      res.setHeader('X-RateLimit-Reset', String(perSubmitter.reset));
    }

    if (!perSubmitter.success) {
      return res.status(429).json({
        error: 'Too many submissions. Please try again later.',
      });
    }

    /* Checked after the per-submitter limit and reported identically, so a
       spammer cannot tell which ceiling it hit. This is the one that stops a
       single machine cycling through invented addresses, since the key above
       changes with the email while this one does not. */
    const perIp = await checkRateLimit(jotformContactIpRatelimit, ip);

    if (!perIp.success) {
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
