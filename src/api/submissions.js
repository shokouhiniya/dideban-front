import { useQuery, useMutation } from '@tanstack/react-query';

import axiosInstance, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export function useValidateUrl() {
  return useMutation({
    mutationFn: async (url) => {
      const res = await axiosInstance.post(endpoints.submissions.validateUrl, { url });
      return res.data;
    },
  });
}

export function useCreateSubmission() {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(endpoints.submissions.create, data);
      return res.data;
    },
  });
}

export function useGetSubmissions(params) {
  return useQuery({
    queryKey: ['submissions', params],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.submissions.list, { params });
      return res.data;
    },
  });
}
