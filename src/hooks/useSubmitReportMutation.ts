import { useMutation } from '@tanstack/react-query';

import { submitReport } from '../api/report';
import type { ReportPayload, ReportResponse } from '../types/report';

type Variables = {
  matchId: string;
  payload: ReportPayload;
  files: File[];
};

export function useSubmitReportMutation() {
  return useMutation<ReportResponse, Error, Variables>({
    mutationFn: ({ matchId, payload, files }) =>
      submitReport(matchId, payload, files),
  });
}
