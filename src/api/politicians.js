import { useQuery } from '@tanstack/react-query';

import axiosInstance, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export function useGetPoliticians(params) {
  return useQuery({
    queryKey: ['politicians', params],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.politicians.list, { params });
      return res.data;
    },
  });
}

export function useSearchPoliticians(query) {
  return useQuery({
    queryKey: ['politicians', 'search', query],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.politicians.search, {
        params: { q: query },
      });
      return res.data;
    },
    enabled: !!query,
  });
}

export function useGetPolitician(id) {
  return useQuery({
    queryKey: ['politician', id],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.politicians.details(id));
      return res.data;
    },
    enabled: !!id,
  });
}

export function useGetPoliticianProfile(id) {
  return useQuery({
    queryKey: ['politician', id, 'profile'],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.politicians.profile(id));
      return res.data;
    },
    enabled: !!id,
  });
}

export function useGetTrendingRedlines() {
  return useQuery({
    queryKey: ['politicians', 'trending'],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.politicians.trending);
      return res.data;
    },
  });
}

export function useGetTopPerformers() {
  return useQuery({
    queryKey: ['politicians', 'top-performers'],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.politicians.topPerformers);
      return res.data;
    },
  });
}

export function useComparePoliticians(ids) {
  return useQuery({
    queryKey: ['politicians', 'compare', ids],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.politicians.compare, {
        params: { ids: ids.join(',') },
      });
      return res.data;
    },
    enabled: ids?.length >= 2,
  });
}
