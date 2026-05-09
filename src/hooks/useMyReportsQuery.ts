import { useQuery } from '@tanstack/react-query';

import { getMyReports } from '../api/report';
import type { ActivityReportResponse } from '../types/report';

export function useMyReportsQuery() {
  return useQuery<ActivityReportResponse[], Error>({
    queryKey: ['reports', 'my'],
    queryFn: getMyReports,
  });
}
