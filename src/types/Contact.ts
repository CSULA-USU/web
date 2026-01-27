import type { CategoryOption } from './CategoriesContact';

export interface ContactFormData {
  subject: string;
  category: CategoryOption | "";
  email: string;
  message: string;
  firstName: string;
  lastInitial: string;
}
