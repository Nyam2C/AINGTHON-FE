export type ReportPayload = {
  insights: string; // textarea
  nextGoals: string;
  // files는 FormData로 별도 append; payload type엔 미포함
};

export type ReportResponse = { reportId: string; fileNames: string[] };
