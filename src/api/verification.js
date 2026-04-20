import { useQuery, useMutation } from '@tanstack/react-query';

import axiosInstance, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export function useGetVerificationQueue(params) {
  return useQuery({
    queryKey: ['verification', 'queue', params],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.verification.queue, { params });
      return res.data;
    },
  });
}

export function useSubmitReview() {
  return useMutation({
    mutationFn: async ({ id, verdict, reason, overrideScore }) => {
      const res = await axiosInstance.post(endpoints.verification.review(id), {
        verdict,
        reason,
        overrideScore,
      });
      return res.data;
    },
  });
}

export function useGetConflicts() {
  return useQuery({
    queryKey: ['verification', 'conflicts'],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.verification.conflicts);
      return res.data;
    },
  });
}

export function useGetActivityLog(params) {
  return useQuery({
    queryKey: ['verification', 'activity-log', params],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.verification.activityLog, { params });
      return res.data;
    },
  });
}
