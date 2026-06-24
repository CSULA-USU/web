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

export type BackofficeLinkItem = {
  url: string;
  title: string;
  description?: string;
  featured?: boolean;
  pageKey?: string;
};

export type BackofficeLinkSection = {
  section: string;
  items: BackofficeLinkItem[];
};

export type CreateRoleBody = {
  role_key?: string;
  role_name?: string;
  description?: string | null;
};

export type UpdateRoleBody = {
  role_name?: string;
  description?: string | null;
  is_active?: boolean;
};

export type DeleteRoleBody = {
  permanent?: boolean;
};

export type AddPolicyBody = {
  page_id?: number;
  action?: string;
  scope?: string;
};

export type DeletePolicyBody = {
  policy_id?: number;
};

export type CreateUserBody = {
  email?: string;
  department_id?: number;
};

export type UpdateUserBody = {
  email?: string;
  department_id?: number | null;
  is_active?: boolean;
};

export type DeleteUserBody = {
  permanent?: boolean;
};

export type RoleAssignmentBody = {
  role_id?: number;
};

export type CreatePageBody = {
  page_key?: string;
  title?: string;
  route?: string;
  description?: string;
};

export type UpdatePageBody = {
  title?: string;
  route?: string;
  description?: string | null;
  is_active?: boolean;
};

export type DeletePageBody = {
  permanent?: boolean;
};

export type AddActionBody = {
  action?: string;
  label?: string;
};

export type DeleteActionBody = {
  action_id?: number;
};

export type AddScopeBody = {
  scope?: string;
  label?: string;
};

export type DeleteScopeBody = {
  scope_id?: number;
};

export type CreateDepartmentBody = {
  department_key?: string;
  department_name?: string;
  department_fullname?: string;
};

export type UpdateDepartmentBody = {
  department_name?: string;
  department_fullname?: string | null;
  is_active?: boolean;
};

export type DeleteDepartmentBody = {
  permanent?: boolean;
};

export type BannerUpdates = Partial<{
  text: string;
  is_visible: boolean;
  link_text: string | null;
  href: string | null;
}>;

export type BodUpdates = Partial<Omit<Document, 'id'>>;

export type DateDoc = {
  category?: Category;
  is_download_all?: boolean;
  date?: string | null;
};
