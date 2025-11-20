// src/types/Backoffice.ts
import type { SupabaseSchema } from './SupabaseSchema';

type RawDoc = SupabaseSchema['public']['Tables']['meeting_documents']['Row'];
type RawInsert =
  SupabaseSchema['public']['Tables']['meeting_documents']['Insert'];
type RawUpdate =
  SupabaseSchema['public']['Tables']['meeting_documents']['Update'];
type Category = SupabaseSchema['public']['Enums']['doc_category'];

/** App-facing, camelCase version */
export interface BODMeetingDocs {
  id: string;
  title: string;
  url: string;
  category: Category;
  date: string | null;
  fy: string | null;
  isArchived: boolean;
  isDownloadAll: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

/** Converters */
export const fromSupabase = (row: RawDoc): BODMeetingDocs => ({
  id: row.id,
  title: row.title,
  url: row.url,
  category: row.category,
  date: row.date,
  fy: row.fy,
  isArchived: row.is_archived,
  isDownloadAll: row.is_download_all,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const toSupabaseInsert = (doc: BODMeetingDocs): RawInsert => ({
  title: doc.title,
  url: doc.url,
  category: doc.category,
  date: doc.date,
  fy: doc.fy,
  is_archived: doc.isArchived,
  is_download_all: doc.isDownloadAll,
});

export const toSupabaseUpdate = (doc: Partial<BODMeetingDocs>): RawUpdate => ({
  title: doc.title,
  url: doc.url,
  category: doc.category,
  date: doc.date,
  fy: doc.fy,
  is_archived: doc.isArchived,
  is_download_all: doc.isDownloadAll,
});

export type { Category };

export interface ToastMessage {
  message: string;
  type: 'success' | 'error';
}
