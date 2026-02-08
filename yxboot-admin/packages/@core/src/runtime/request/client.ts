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
import type {
  RequestClientConfig,
  RequestInterceptorConfig,
  ResponseInterceptorConfig,
  ResponseReturnType,
} from './types';
import { downloadFile } from './downloader';
import { FileUploader } from './uploader';

/** 请求拦截器 */
export type RequestInterceptor = (
  config: InternalAxiosRequestConfig,
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

/** 响应拦截器 */
export type ResponseInterceptor = (
  response: AxiosResponse,
) => AxiosResponse | Promise<AxiosResponse> | any;

/** 错误拦截器 */
export type ErrorInterceptor = (error: any) => any;

/**
 * HTTP 客户端类
 */
export class HttpClient {
  private instance: AxiosInstance;
  private defaultResponseReturn: ResponseReturnType = 'data';
  /** 是否正在刷新 token（供拦截器使用） */
  public isRefreshing = false;
  /** 刷新 token 时的请求队列 */
  public refreshTokenQueue: ((token: string) => void)[] = [];
  private uploader: FileUploader;

  constructor(config: RequestConfig & { responseReturn?: ResponseReturnType } = {}) {
    this.defaultResponseReturn = config.responseReturn ?? 'data';
    this.instance = axios.create({
      baseURL: config.baseURL || '',
      timeout: config.timeout ?? 10000,
      headers: config.headers ?? {
        'Content-Type': 'application/json;charset=utf-8',
      },
      withCredentials: config.withCredentials ?? false,
    });
    this.uploader = new FileUploader(this);
  }

  /**
   * 添加请求拦截器（支持对象形式）
   */
  addRequestInterceptor(
    configOrOnFulfilled: RequestInterceptorConfig | RequestInterceptor,
    onRejected?: ErrorInterceptor,
  ): number {
    if (typeof configOrOnFulfilled === 'function') {
      return this.instance.interceptors.request.use(
        configOrOnFulfilled,
        onRejected,
      );
    }
    const { fulfilled, rejected } = configOrOnFulfilled;
    return this.instance.interceptors.request.use(fulfilled ?? ((c) => c), rejected);
  }

  /**
   * 添加响应拦截器（支持对象形式）
   */
  addResponseInterceptor<T = any>(
    configOrOnFulfilled:
      | ResponseInterceptorConfig<T>
      | ResponseInterceptor,
    onRejected?: ErrorInterceptor,
  ): number {
    if (typeof configOrOnFulfilled === 'function') {
      return this.instance.interceptors.response.use(
        configOrOnFulfilled,
        onRejected,
      );
    }
    const { fulfilled, rejected } = configOrOnFulfilled;
    return this.instance.interceptors.response.use(fulfilled, rejected);
  }

  /**
   * GET 请求
   */
  get<T = any>(url: string, config?: RequestClientConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  /**
   * POST 请求
   */
  post<T = any>(
    url: string,
    data?: any,
    config?: RequestClientConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, data, method: 'POST', url });
  }

  /**
   * PUT 请求
   */
  put<T = any>(
    url: string,
    data?: any,
    config?: RequestClientConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, data, method: 'PUT', url });
  }

  /**
   * DELETE 请求
   */
  delete<T = any>(url: string, config?: RequestClientConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }

  /**
   * 通用请求方法
   */
  async request<T = any>(config: AxiosRequestConfig & RequestClientConfig): Promise<T> {
    const responseReturn =
      (config as RequestClientConfig).responseReturn ?? this.defaultResponseReturn;

    const response = await this.instance.request<ApiResponse<T>>(config);

    if (responseReturn === 'raw') {
      return response as unknown as T;
    }
    if (responseReturn === 'body') {
      return response.data as unknown as T;
    }
    const data = response.data as ApiResponse<T>;
    if (data?.data !== undefined) {
      return data.data;
    }
    return response.data as unknown as T;
  }

  /**
   * 文件上传
   */
  upload<T = any>(
    url: string,
    data: Record<string, unknown> & { file: Blob | File },
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.uploader.upload<T>(url, data, config);
  }

  /**
   * 文件下载（返回 Blob）
   */
  async download(
    url: string,
    config?: { responseType?: 'blob'; method?: string; [k: string]: any },
  ): Promise<Blob> {
    return downloadFile(this, url, config);
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
export function createHttpClient(
  config?: RequestConfig & { responseReturn?: ResponseReturnType },
): HttpClient {
  return new HttpClient(config);
}
