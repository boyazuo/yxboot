/**
 * HTTP 常量
 */

/** HTTP 状态码 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

/** HTTP 方法 */
export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

/** 请求超时时间（毫秒） */
export const REQUEST_TIMEOUT = 10000;

/** 请求重试次数 */
export const REQUEST_RETRY_COUNT = 3;

/** 请求重试延迟（毫秒） */
export const REQUEST_RETRY_DELAY = 1000;
