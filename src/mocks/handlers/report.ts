import { http, HttpResponse } from 'msw';

import {
  addReport,
  findReport,
  mockReports,
  patchReport,
  setReportAttachment,
} from '../fixtures/reports';
import type {
  ActivityReportCreateRequest,
  ActivityReportUpdateRequest,
} from '../../types/report';

const ME_ID = 1;

function ok<T>(data: T) {
  return HttpResponse.json({ success: true, data });
}

function err(status: number, message: string) {
  return HttpResponse.json({ success: false, message }, { status });
}

export const reportHandlers = [
  http.post('*/api/reports', async ({ request }) => {
    const body = (await request.json()) as ActivityReportCreateRequest;
    const created = addReport(body, ME_ID);
    return ok(created);
  }),

  http.post('*/api/reports/:id/attachment', ({ params }) => {
    const id = Number(params.id);
    const url = `https://example.com/file/${crypto.randomUUID()}`;
    const updated = setReportAttachment(id, url);
    if (!updated) return err(404, '보고서를 찾을 수 없습니다.');
    return ok(updated);
  }),

  http.put('*/api/reports/:id', async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as ActivityReportUpdateRequest;
    const updated = patchReport(id, body);
    if (!updated) return err(404, '보고서를 찾을 수 없습니다.');
    return ok(updated);
  }),

  http.get('*/api/reports/my', () =>
    ok(mockReports.filter(r => r.userId === ME_ID)),
  ),

  http.get('*/api/reports/:id', ({ params }) => {
    const id = Number(params.id);
    const r = findReport(id);
    if (!r) return err(404, '보고서를 찾을 수 없습니다.');
    return ok(r);
  }),
];
