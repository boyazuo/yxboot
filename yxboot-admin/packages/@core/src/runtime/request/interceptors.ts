import type { AxiosResponse } from 'axios';
import type { HttpClient } from './client';
import type {
  MakeErrorMessageFn,
  ResponseInterceptorConfig,
  ResponseReturnType,
} from './types';

export interface DefaultResponseInterceptorOptions {
  codeField?: string;
  dataField?: string | ((response: any) => any);
  successCode?: number | string | ((code: any) => boolean);
}

/**
 * 默认响应成功拦截：按 code/data 解构
 */
export function createResponseInterceptor(
  options: DefaultResponseInterceptorOptions = {},
): ResponseInterceptorConfig {
  const {
    codeField = 'code',
    dataField = 'data',
    successCode = 0,
  } = options;

  return {
    fulfilled: (response: AxiosResponse) => {
      const config = response.config as { responseReturn?: ResponseReturnType };
      const data = response.data;

      if (config.responseReturn === 'raw') {
        return response;
      }

      if (response.status >= 200 && response.status < 400) {
        const code = data?.[codeField];
        const success =
          typeof successCode === 'function'
            ? successCode(code)
            : code === successCode;

        if (success) {
          if (config.responseReturn === 'body') {
            return data;
          }
          const result =
            typeof dataField === 'function' ? dataField(data) : data?.[dataField];
          return result;
        }
      }

      return Promise.reject(
        Object.assign(new Error(data?.message || 'Request failed'), {
          response,
          config,
        }),
      );
    },
  };
}

/**
 * 认证失败 401 与 Token 刷新拦截（需配合 createHttpClient 使用）
 */
export function createAuthResponseInterceptor(options: {
  client: HttpClient;
  doReAuthenticate: () => Promise<void>;
  doRefreshToken?: () => Promise<string>;
  formatToken?: (token: string) => string | null;
}): ResponseInterceptorConfig {
  const {
    client,
    doReAuthenticate,
    doRefreshToken,
    formatToken = (t: string) => t,
  } = options;

  return {
    rejected: async (error: any) => {
      const { config, response } = error;
      if (response?.status !== 401) {
        return Promise.reject(error);
      }
      if (!doRefreshToken || (config as any).__isRetryRequest) {
        await doReAuthenticate();
        return Promise.reject(error);
      }

      const isRefreshing = (client as any).isRefreshing;
      const queue = (client as any).refreshTokenQueue as ((token: string) => void)[];

      if (isRefreshing && queue) {
        return new Promise((resolve) => {
          queue.push((newToken: string) => {
            const headers = config.headers || {};
            headers.Authorization = formatToken(newToken) ?? newToken;
            resolve(client.getInstance().request({ ...config, headers }));
          });
        });
      }

      (client as any).isRefreshing = true;
      (config as any).__isRetryRequest = true;

      try {
        const newToken = await doRefreshToken();
        if (queue?.length) {
          queue.forEach((cb) => cb(newToken));
          (client as any).refreshTokenQueue = [];
        }
        return client.getInstance().request(config);
      } catch (e) {
        if (queue?.length) queue.forEach((cb) => cb(''));
        (client as any).refreshTokenQueue = [];
        await doReAuthenticate();
        return Promise.reject(e);
      } finally {
        (client as any).isRefreshing = false;
      }
    },
  };
}

/**
 * 统一错误提示拦截
 */
export function createErrorMessageInterceptor(
  makeErrorMessage?: MakeErrorMessageFn,
): ResponseInterceptorConfig {
  return {
    rejected: (error: any) => {
      if (error?.__CANCEL__) {
        return Promise.reject(error);
      }
      const status = error?.response?.status;
      let msg = '';
      if (error?.message?.includes?.('Network Error')) {
        msg = '网络错误';
      } else if (error?.message?.includes?.('timeout')) {
        msg = '请求超时';
      } else {
        switch (status) {
          case 400:
            msg = '请求参数错误';
            break;
          case 401:
            msg = '未授权，请登录';
            break;
          case 403:
            msg = '拒绝访问';
            break;
          case 404:
            msg = '请求地址不存在';
            break;
          case 408:
            msg = '请求超时';
            break;
          default:
            msg = error?.response?.data?.message || '服务器错误';
        }
      }
      makeErrorMessage?.(msg, error);
      return Promise.reject(error);
    },
  };
}
