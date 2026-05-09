import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createReport, uploadReportAttachment } from '../api/report';
import type {
  ActivityReportCreateRequest,
  ActivityReportResponse,
} from '../types/report';

type Variables = ActivityReportCreateRequest & {
  file?: File | null;
};

export function useSubmitReportMutation() {
  const queryClient = useQueryClient();

  return useMutation<ActivityReportResponse, Error, Variables>({
    mutationFn: async ({ file, ...body }) => {
      const report = await createReport(body);
      if (file) {
        return uploadReportAttachment(report.id, file);
      }
      return report;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
}
