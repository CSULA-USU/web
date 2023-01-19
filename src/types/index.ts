export * from './DesignSystem';

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
