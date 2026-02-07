import { createHttpClient } from '@yxboot/core/runtime/request';

// 创建 HTTP 客户端
export const http = createHttpClient({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
});

// 请求拦截器
http.addRequestInterceptor((config) => {
  // TODO: 添加 token
  return config;
});

// 响应拦截器
http.addResponseInterceptor(
  (response) => {
    return response;
  },
  (error) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  },
);
