import { Resend } from 'resend';
import { categoryMap } from 'types/CategoriesContact';
import type { ContactFormData } from 'types/Contact';

const FROM =
  process.env.FEEDBACK_FROM_EMAIL ||
  'Cal State LA U-SU Feedback <automailer@calstatelausu.org>';
const USU_CONTACT_EMAIL = 'usuadmin@calstatela.edu';

// Hosted logo for the email letterhead. Must be an absolute, publicly
// reachable URL — email clients (notably Gmail) strip data: URIs and route
// images through proxies, so the file must serve raw with an image/* type.
// This JPEG carries its own white background, so it stays legible in
// dark-mode clients. Override via FEEDBACK_LOGO_URL.
const LOGO_URL =
  process.env.FEEDBACK_LOGO_URL ||
  'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/rgb-white-logo-300dpi.jpg';

// Letterhead prepended to both emails. alt text names the sender so the email
// still reads as official when images are blocked (the default in many clients
// until the recipient clicks "show images").
const EMAIL_HEADER_HTML = `
      <div style="margin-bottom: 24px;">
        <img
          src="${LOGO_URL}"
          alt="University-Student Union at Cal State LA"
          width="180"
          style="display: block; width: 180px; max-width: 100%; height: auto;"
        />
      </div>`;

// Signature/footer appended to both emails. A real postal address + phone is a
// recognized legitimacy signal (CAN-SPAM best practice, and a positive spam-
// filter signal), and the extra text improves the text-to-image ratio that
// filters score. Address/phone mirror the site footer (Footer.tsx).
const EMAIL_FOOTER_HTML = `
      <p style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e0e0e0; color: #555555; font-size: 13px; line-height: 1.6;">
        <strong>University-Student Union at Cal State LA</strong><br />
        5154 State University Dr., Los Angeles, CA 90032<br />
        (323) 343-2465 &middot; <a href="https://www.calstatelausu.org" style="color: #555555;">calstatelausu.org</a>
      </p>`;

// Slack incoming-webhook URL for failure alerts. Deliberately a channel
// separate from Resend, so an alert still lands when email itself is down.
const SLACK_ALERT_WEBHOOK_URL = process.env.SLACK_ALERT_WEBHOOK_URL;

/**
 * Admin recipients who get notified of every feedback submission.
 * Override with a comma-separated FEEDBACK_NOTIFY_EMAILS env var.
 */

const DEFAULT_NOTIFY_RECIPIENTS = [
  'usuadmin@calstatela.edu',
  'mbell27@calstatela.edu',
];

function notifyRecipients(): string[] {
  const configured = process.env.FEEDBACK_NOTIFY_EMAILS;
  if (configured && configured.trim()) {
    return configured
      .split(',')
      .map((email) => email.trim())
      .filter(Boolean);
  }
  return DEFAULT_NOTIFY_RECIPIENTS;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function submitterName(formData: ContactFormData): string {
  const first = formData.firstName?.trim();
  const last = formData.lastInitial?.trim();
  if (first && last) return `${first} ${last}.`;
  if (first) return first;
  return 'Anonymous';
}

function renderMessageHtml(message: string): string {
  // Preserve the submitter's line breaks in the HTML email.
  return escapeHtml(message).replace(/\n/g, '<br />');
}

/**
 * Sends the feedback to the U-SU team and a confirmation to the submitter.
 *
 * Jotform's API submissions don't fire its automailer, so this is how the
 * team actually learns a submission happened. Callers should treat a thrown
 * error here as non-fatal: the submission is already recorded in Jotform.
 */
export async function sendFeedbackNotifications(
  formData: ContactFormData,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const resend = new Resend(apiKey);

  const readableCategory =
    categoryMap[formData.category] || formData.category || 'Uncategorized';
  const name = submitterName(formData);
  const subject = formData.subject || '(no subject)';
  const messageHtml = renderMessageHtml(formData.message || '');

  // 1. Notify the U-SU team. Reply-To is the submitter so staff can respond
  //    directly to the person who left the feedback.
  const teamEmail = resend.emails.send({
    from: FROM,
    to: notifyRecipients(),
    replyTo: formData.email,
    subject: `[Feedback: ${readableCategory}] ${subject}`,
    html: `
      ${EMAIL_HEADER_HTML}
      <h2>New feedback submission</h2>
      <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(
      formData.email,
    )})</p>
      <p><strong>Category:</strong> ${escapeHtml(readableCategory)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${messageHtml}</p>
      ${EMAIL_FOOTER_HTML}
    `,
  });

  // 2. Confirm receipt to the submitter. Reply-To is the U-SU address so a
  //    reply reaches the team.
  const confirmationEmail = resend.emails.send({
    from: FROM,
    to: formData.email,
    replyTo: USU_CONTACT_EMAIL,
    subject: `We received your feedback: ${subject}`,
    html: `
      ${EMAIL_HEADER_HTML}
      <p>Hi ${escapeHtml(formData.firstName?.trim() || 'there')},</p>
      <p>
        Thank you for reaching out to the University-Student Union at Cal State LA.
        We've received your feedback and the team will review it.
      </p>
      <p><strong>Category:</strong> ${escapeHtml(readableCategory)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Your message:</strong></p>
      <p>${messageHtml}</p>
      <p>
        If you need to follow up, please feel free to reply to this email and it will reach us at ${USU_CONTACT_EMAIL}.
      </p>
      ${EMAIL_FOOTER_HTML}
    `,
  });

  const [teamResult, confirmationResult] = await Promise.all([
    teamEmail,
    confirmationEmail,
  ]);

  if (teamResult.error || confirmationResult.error) {
    throw new Error(
      `Resend send failed: ${JSON.stringify({
        team: teamResult.error,
        confirmation: confirmationResult.error,
      })}`,
    );
  }
}

/**
 * Posts a Slack alert when a feedback email fails to send.
 *
 * Best-effort and self-contained: a no-op when SLACK_ALERT_WEBHOOK_URL is
 * unset (e.g. local/preview), and it never throws — the caller logs the
 * failure regardless, so alerting must not be able to fail the request.
 */
export async function sendFeedbackEmailFailureAlert(
  formData: ContactFormData,
  error: unknown,
): Promise<void> {
  if (!SLACK_ALERT_WEBHOOK_URL) return;

  const reason = error instanceof Error ? error.message : String(error);

  try {
    await fetch(SLACK_ALERT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: [
          ':warning: *Feedback email failed to send*',
          `*From:* ${formData.email || '(unknown)'}`,
          `*Subject:* ${formData.subject || '(none)'}`,
          `*Category:* ${formData.category || '(none)'}`,
          `*Error:* ${reason}`,
        ].join('\n'),
      }),
    });
  } catch (alertError) {
    console.error('[FEEDBACK_ALERT_FAILED]', alertError);
  }
}
