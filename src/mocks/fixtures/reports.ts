import type {
  ActivityReportCreateRequest,
  ActivityReportResponse,
  ActivityReportUpdateRequest,
} from '../../types/report';

const isoNow = new Date().toISOString();

export const mockReports: ActivityReportResponse[] = [
  {
    id: 1,
    scheduleId: 3,
    userId: 1,
    insights: '디자인 토큰 설계 시 의미 단위로 추상화하는 게 핵심.',
    nextGoal: '내 프로젝트에 토큰 적용 + 라이트/다크 테마 추가',
    attachmentUrl: 'https://example.com/file/sample-report.pdf',
    createdAt: isoNow,
    updatedAt: isoNow,
  },
];

let nextReportId = 2;

export function addReport(
  body: ActivityReportCreateRequest,
  userId: number,
): ActivityReportResponse {
  const r: ActivityReportResponse = {
    id: nextReportId++,
    scheduleId: body.scheduleId,
    userId,
    insights: body.insights,
    nextGoal: body.nextGoal,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockReports.push(r);
  return r;
}

export function setReportAttachment(
  reportId: number,
  url: string,
): ActivityReportResponse | undefined {
  const r = mockReports.find(x => x.id === reportId);
  if (!r) return undefined;
  r.attachmentUrl = url;
  r.updatedAt = new Date().toISOString();
  return r;
}

export function patchReport(
  reportId: number,
  body: ActivityReportUpdateRequest,
): ActivityReportResponse | undefined {
  const r = mockReports.find(x => x.id === reportId);
  if (!r) return undefined;
  if (body.insights !== undefined) r.insights = body.insights;
  if (body.nextGoal !== undefined) r.nextGoal = body.nextGoal;
  r.updatedAt = new Date().toISOString();
  return r;
}

export function findReport(id: number): ActivityReportResponse | undefined {
  return mockReports.find(r => r.id === id);
}
