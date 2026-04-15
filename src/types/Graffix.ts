export interface GraffixRequest {
  id: string;
  title: string;
  departmentID: string;
  status?: string;
  submissionDate?: string;
  requestorName?: string;
  digitalDeliveryDate?: string;
  sendToPrintDate?: string;
  printDeliveryDate?: string;
  eventDate?: string;
  projectBriefURL?: string;
}
