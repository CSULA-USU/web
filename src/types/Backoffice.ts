export type Category = 'Calendar' | 'Agenda' | 'Minutes';

export interface Document {
  id: string;
  title: string;
  url: string;
  category: Category;
  date?: string;
  is_archived?: boolean;
  fy: string;
  is_download_all?: boolean;
}

export interface ToastMessage {
  message: string;
  type: 'success' | 'error';
}
