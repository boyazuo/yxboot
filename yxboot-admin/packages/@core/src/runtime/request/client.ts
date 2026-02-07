/**
 * HTTP 请求客户端
 */
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import type { ApiResponse, RequestConfig } from '../../base/types/http';

/** 请求拦截器 */
export type RequestInterceptor = (
  config: InternalAxiosRequestConfig,
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

/** 响应拦截器 */
export type ResponseInterceptor = (
  response: AxiosResponse,
) => AxiosResponse | Promise<AxiosResponse>;

/** 错误拦截器 */
export type ErrorInterceptor = (error: any) => any;

/**
 * HTTP 客户端类
 */
export class HttpClient {
  private instance: AxiosInstance;

  constructor(config: RequestConfig = {}) {
    this.instance = axios.create({
      baseURL: config.baseURL || '',
      timeout: config.timeout || 10000,
      headers: config.headers || {},
      withCredentials: config.withCredentials ?? false,
    });
  }

  /**
   * 添加请求拦截器
   */
  addRequestInterceptor(
    onFulfilled?: RequestInterceptor,
    onRejected?: ErrorInterceptor,
  ): number {
    return this.instance.interceptors.request.use(onFulfilled, onRejected);
  }

  /**
   * 添加响应拦截器
   */
  addResponseInterceptor(
    onFulfilled?: ResponseInterceptor,
    onRejected?: ErrorInterceptor,
  ): number {
    return this.instance.interceptors.response.use(onFulfilled, onRejected);
  }

  /**
   * GET 请求
   */
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  /**
   * POST 请求
   */
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  /**
   * PUT 请求
   */
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  /**
   * DELETE 请求
   */
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }

  /**
   * 通用请求方法
   */
  async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.request<ApiResponse<T>>(config);
    return response.data.data;
  }

  /**
   * 获取 Axios 实例
   */
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

/**
 * 创建 HTTP 客户端
 */
export function createHttpClient(config?: RequestConfig): HttpClient {
  return new HttpClient(config);
}
