export type Category = 'Agenda' | 'Minutes' | 'Calendar';

export interface Document {
  id: string;
  title: string;
  url: string;
  category: Category;
  date?: string | null;
  is_archived?: boolean;
  fy?: string | null;
  is_download_all?: boolean;
}

export interface ToastMessage {
  message: string;
  type: 'success' | 'error';
}

export type GetDocsOptions = {
  category?: Category;
  fy?: string | null;
  isArchived?: boolean;
  isDownloadAll?: boolean;
  limit?: number;
  order?: 'asc' | 'desc';
};
