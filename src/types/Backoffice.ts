export type Category = 'Agenda' | 'Minutes' | 'Calendar';
export type BackofficePolicy = `${string}:${string}:${string}`;

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

export type BackofficeLinkItem = {
  url: string;
  title: string;
  description?: string;
  featured?: boolean;
};

export type BackofficeLinkSection = {
  section: string;
  items: BackofficeLinkItem[];
};

export interface CurrentBackofficeUser {
  id: number;
  email: string;
  roleId: number;
  roleName: string;
  departmentId: number;
  departmentName: string;
  departmentFullName: string;
  rolePolicies: string[];
  userPolicies: string[];
  effectivePolicies: string[];
}
