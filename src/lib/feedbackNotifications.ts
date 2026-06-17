import { Resend } from 'resend';
import { categoryMap } from 'types/CategoriesContact';
import type { ContactFormData } from 'types/Contact';

const FROM =
  process.env.FEEDBACK_FROM_EMAIL ||
  'U-SU Feedback <noreply@calstatelausu.org>';
const USU_CONTACT_EMAIL = 'usuadmin@calstatela.edu';

const DEFAULT_NOTIFY_RECIPIENTS = [
  // 'usuadmin@calstatela.edu', 'mbell27@calstatela.edu',
  'jyasis@calstatela.edu',
];

/**
 * Admin recipients who get notified of every feedback submission.
 * Override with a comma-separated FEEDBACK_NOTIFY_EMAILS env var.
 */
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
      <h2>New feedback submission</h2>
      <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(
      formData.email,
    )})</p>
      <p><strong>Category:</strong> ${escapeHtml(readableCategory)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${messageHtml}</p>
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
      <p>Hi ${escapeHtml(formData.firstName?.trim() || 'there')},</p>
      <p>
        Thank you for reaching out to the Cal State LA University-Student Union.
        We've received your feedback and the team will review it.
      </p>
      <p><strong>Category:</strong> ${escapeHtml(readableCategory)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Your message:</strong></p>
      <p>${messageHtml}</p>
      <p>
        If you need to follow up, just reply to this email and it will reach us
        at ${USU_CONTACT_EMAIL}.
      </p>
      <p>&mdash; University-Student Union</p>
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
