import { useQuery } from '@tanstack/react-query';

import axiosInstance, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export function useGetStances(politicianId, params) {
  return useQuery({
    queryKey: ['stances', politicianId, params],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.stances.list(politicianId), { params });
      return res.data;
    },
    enabled: !!politicianId,
  });
}

export function useGetStanceTimeline(politicianId, topic) {
  return useQuery({
    queryKey: ['stances', politicianId, 'timeline', topic],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.stances.timeline(politicianId), {
        params: { topic },
      });
      return res.data;
    },
    enabled: !!politicianId,
  });
}

export function useGetContradictions(politicianId) {
  return useQuery({
    queryKey: ['stances', politicianId, 'contradictions'],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.stances.contradictions(politicianId));
      return res.data;
    },
    enabled: !!politicianId,
  });
}
