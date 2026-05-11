export type V2Department = {
  id: number;
  department_key: string;
  department_name: string;
  department_fullname: string;
};

export type V2Role = {
  id: number;
  role_key: string;
  role_name: string;
};

export type V2Policy = {
  id: number;
  page_id: number;
  page_key: string;
  page_title: string;
  action: string;
  scope: string;
};

export type V2UserRow = {
  id: number;
  email: string;
  is_active: boolean;
  department: V2Department | null;
  roles: V2Role[];
  policies: V2Policy[];
};

export type V2RoleRow = {
  id: number;
  role_key: string;
  role_name: string;
  description: string | null;
  is_system: boolean;
  is_active: boolean;
  users_count: number;
  policies: V2Policy[];
};

export type V2PageAction = {
  id: number;
  action: string;
  label: string;
};

export type V2PageScope = {
  id: number;
  scope: string;
  label: string;
};

export type V2PageRow = {
  id: number;
  page_key: string;
  title: string;
  route: string;
  description: string | null;
  is_active: boolean;
  page_actions: V2PageAction[];
  page_scopes: V2PageScope[];
};

export type V2DepartmentRow = {
  id: number;
  department_key: string;
  department_name: string;
  department_fullname: string;
  is_active: boolean;
  users_count: number;
};
