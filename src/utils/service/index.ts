import { REQUEST_TIMEOUT } from './constants';
import { createRequest } from './request';

export const request = createRequest({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

export * from './typings';
export * from './constants';