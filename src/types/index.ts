export * from './DesignSystem';
export * from './Departments';
export * from './Instagram';
export * from './Supabase';
export * from './CGCJotformSubmissions';
export * from './Game';

export interface PresenceEvent {
  apiId: string;
  campusName: string;
  description: string;
  endDateTimeUtc: string;
  eventName: string;
  eventNoSqlId: string;
  hasCoverImage: boolean;
  hasEventEnded: boolean;
  hasVirtualEventIntegration: boolean;
  isVirtualEventLink: boolean;
  location: string;
  orgStructureNoSqlId: string;
  organizationName: string;
  organizationUri: string;
  photoType: string;
  photoUri: string;
  photoUriWithVersion: string;
  startDateTimeUtc: string;
  statusId: 0;
  subdomain: string;
  tags: string[];
  uri: string;
}

export interface UKrewStudent {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  department: string;
  role: string;
  major: string;
  phoneNumber: string;
  linkedIn: string;
  photoUpload?: string;
  image?: string;
  graduationSemester: string;
  graduationYear: string;
  portfolioLink?: string;
  session: string;
}
