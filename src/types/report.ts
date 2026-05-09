export type ActivityReportCreateRequest = {
  scheduleId: number;
  insights?: string;
  nextGoal?: string;
};

export type ActivityReportUpdateRequest = {
  insights?: string;
  nextGoal?: string;
};

export type ActivityReportResponse = {
  id: number;
  scheduleId: number;
  userId: number;
  insights?: string;
  nextGoal?: string;
  attachmentUrl?: string;
  createdAt: string;
  updatedAt: string;
};
