import { useQuery } from '@tanstack/react-query';

import axiosInstance, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export function useGetTopics() {
  return useQuery({
    queryKey: ['codebook', 'topics'],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.codebook.topics);
      return res.data;
    },
  });
}

export function useGetSubtopics(topicId) {
  return useQuery({
    queryKey: ['codebook', 'subtopics', topicId],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.codebook.subtopics(topicId));
      return res.data;
    },
    enabled: !!topicId,
  });
}
