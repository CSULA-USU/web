import type { CategoryOption } from './CategoriesContact';

export interface ContactFormData {
  subject: string;
  category: CategoryOption | '';
  email: string;
  message: string;
  firstName: string;
  lastInitial: string;
  website?: string;
  /**
   * Milliseconds between the form mounting and the submit, sent by the client
   * so the server can reject submissions no human could have typed. Optional on
   * the type because it is an anti-spam signal rather than form content, but
   * the real form always sends it and the server treats its absence as a fail.
   */
  formFillDurationMs?: number;
}
