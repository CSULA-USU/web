export interface SupaPage {
  id: number;
  slug: string;
  title: string;
  sections: SupaSection[];
}

export interface SupaSection {
  id?: number;
  page_id: number;
  name: string;
  order: number;
  data: any;
  stagedDelete?: boolean;
}

export interface BackOfficeUser {
  email: string;
  role: string;
  department: string;
  polices: string[];
}
