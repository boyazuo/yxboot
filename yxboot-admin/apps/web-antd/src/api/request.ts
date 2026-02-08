import { createHttpClient } from '@yxboot/core';
import { useAuthStore } from '@yxboot/core';

const baseURL = import.meta.env.VITE_API_URL || '/api';

/** 后端统一响应格式 (yxboot-api Result) */
interface BackendResult<T = unknown> {
  code: number;
  msg: string;
  data: T;
}

/** 带认证的请求客户端（返回 data 层） */
export const requestClient = createHttpClient({
  baseURL,
  timeout: 15000,
  withCredentials: true,
  responseReturn: 'data',
});

/** 基础请求客户端（用于 refresh/logout 等，避免循环依赖） */
export const baseRequestClient = createHttpClient({
  baseURL,
  timeout: 15000,
  withCredentials: true,
  responseReturn: 'data',
});

/** 后端 code 非 0 时统一走错误分支 */
function backendResultInterceptor(response: any) {
  const data = response?.data as BackendResult | undefined;
  if (data && typeof data.code === 'number' && data.code !== 0) {
    return Promise.reject(
      Object.assign(new Error(data.msg || '请求失败'), { response, code: data.code }),
    );
  }
  return response;
}

requestClient.addResponseInterceptor(backendResultInterceptor);
baseRequestClient.addResponseInterceptor(backendResultInterceptor);

// 请求拦截：注入 Token
requestClient.addRequestInterceptor((config: any) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  if (token && config.headers) {
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截：401 跳转登录
requestClient.addResponseInterceptor(
  (response: any) => response,
  (error: any) => {
    if (error?.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.clearAuth();
      const path = window.location.pathname;
      if (!path.startsWith('/auth')) {
        window.location.href = `/auth/login?redirect=${encodeURIComponent(path)}`;
      }
    }
    return Promise.reject(error);
  },
);
