import axios from 'axios';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong!';
    console.error('Axios error:', message);
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args, {}];

    const res = await axiosInstance.get(url, config);

    return res.data;
  } catch (error) {
    console.error('Fetcher failed:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
  },
  // Dideban endpoints
  politicians: {
    list: '/api/politicians',
    search: '/api/politicians/search',
    details: (id) => `/api/politicians/${id}`,
    profile: (id) => `/api/politicians/${id}/profile`,
    trending: '/api/politicians/trending',
    topPerformers: '/api/politicians/top-performers',
    compare: '/api/politicians/compare',
  },
  stances: {
    list: (politicianId) => `/api/politicians/${politicianId}/stances`,
    timeline: (politicianId) => `/api/politicians/${politicianId}/stances/timeline`,
    contradictions: (politicianId) => `/api/politicians/${politicianId}/stances/contradictions`,
  },
  promises: {
    list: (politicianId) => `/api/politicians/${politicianId}/promises`,
  },
  submissions: {
    create: '/api/submissions',
    list: '/api/submissions',
    details: (id) => `/api/submissions/${id}`,
    validateUrl: '/api/submissions/validate-url',
  },
  verification: {
    queue: '/api/verification/queue',
    review: (id) => `/api/verification/${id}/review`,
    conflicts: '/api/verification/conflicts',
    activityLog: '/api/verification/activity-log',
  },
  codebook: {
    topics: '/api/codebook/topics',
    subtopics: (topicId) => `/api/codebook/topics/${topicId}/subtopics`,
  },
};
