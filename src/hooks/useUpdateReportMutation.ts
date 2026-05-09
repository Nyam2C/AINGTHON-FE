import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateReport } from '../api/report';
import type {
  ActivityReportResponse,
  ActivityReportUpdateRequest,
} from '../types/report';

type Variables = {
  reportId: number;
  body: ActivityReportUpdateRequest;
};

export function useUpdateReportMutation() {
  const queryClient = useQueryClient();

  return useMutation<ActivityReportResponse, Error, Variables>({
    mutationFn: ({ reportId, body }) => updateReport(reportId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
}
