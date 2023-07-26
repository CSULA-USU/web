export interface Page {
  id: number;
  sections: PageSection[];
}

export interface PageSection {
  id: number;
  page_id: number;
  section_name: string;
  order: number;
  data: any;
  component?: SectionComponent;
}

export interface SectionComponent {
  id: number;
  name: string;
  schema: any;
}
