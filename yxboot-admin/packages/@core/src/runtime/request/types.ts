import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

/**
 * 响应返回模式
 * - raw: 原始 AxiosResponse
 * - body: 仅响应 body
 * - data: 解构 body 中的 data 字段（并校验 code）
 */
export type ResponseReturnType = 'raw' | 'body' | 'data';

/**
 * 请求配置（扩展 Axios）
 */
export type RequestClientConfig<T = any> = Omit<AxiosRequestConfig<T>, 'paramsSerializer'> & {
  /** 响应返回方式 */
  responseReturn?: ResponseReturnType;
  /** 参数序列化 */
  paramsSerializer?: 'brackets' | 'comma' | 'indices' | 'repeat' | AxiosRequestConfig['paramsSerializer'];
};

/**
 * 请求客户端选项
 */
export interface RequestClientOptions extends RequestClientConfig {
  /** 默认超时 */
  timeout?: number;
  /** 默认响应返回方式 */
  responseReturn?: ResponseReturnType;
}

/**
 * 请求拦截器配置
 */
export interface RequestInterceptorConfig {
  fulfilled?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  rejected?: (error: any) => any;
}

/**
 * 响应拦截器配置
 */
export interface ResponseInterceptorConfig<T = any> {
  fulfilled?: (
    response: AxiosResponse<T>,
  ) => AxiosResponse<T> | Promise<AxiosResponse<T>> | any;
  rejected?: (error: any) => any;
}

/**
 * 标准 HTTP 响应体
 */
export interface HttpResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export type MakeErrorMessageFn = (message: string, error: any) => void;
