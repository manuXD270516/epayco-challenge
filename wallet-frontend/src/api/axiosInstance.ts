import axios from 'axios';

const getApiUrl = () => {
  if (typeof window !== 'undefined' && (window as any).__ENV__?.API_URL) {
    return (window as any).__ENV__.API_URL;
  }

  return import.meta.env.VITE_API_URL || 'http://localhost:4000';
};

export const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});
