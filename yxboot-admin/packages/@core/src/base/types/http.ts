/**
 * HTTP 请求相关类型
 */

/** 请求方法 */
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** 请求配置 */
export interface RequestConfig {
  /** 基础 URL */
  baseURL?: string;
  /** 超时时间 */
  timeout?: number;
  /** 请求头 */
  headers?: Record<string, string>;
  /** 是否携带凭证 */
  withCredentials?: boolean;
  /** 重试次数 */
  retry?: number;
  /** 重试延迟 */
  retryDelay?: number;
}

/** API 响应 */
export interface ApiResponse<T = any> {
  /** 状态码 */
  code: number;
  /** 消息 */
  message: string;
  /** 数据 */
  data: T;
  /** 是否成功 */
  success?: boolean;
  /** 时间戳 */
  timestamp?: number;
}

/** 分页参数 */
export interface PageParams {
  /** 当前页 */
  page?: number;
  /** 每页数量 */
  pageSize?: number;
  /** 排序字段 */
  sortField?: string;
  /** 排序方式 */
  sortOrder?: 'asc' | 'desc';
}

/** 分页结果 */
export interface PageResult<T = any> {
  /** 列表数据 */
  list: T[];
  /** 总数 */
  total: number;
  /** 当前页 */
  page: number;
  /** 每页数量 */
  pageSize: number;
  /** 总页数 */
  totalPages?: number;
}

/** 上传文件响应 */
export interface UploadFileResult {
  /** 文件名 */
  name: string;
  /** 文件 URL */
  url: string;
  /** 文件大小 */
  size?: number;
  /** 文件类型 */
  type?: string;
}
