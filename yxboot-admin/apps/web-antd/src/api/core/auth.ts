import { baseRequestClient, requestClient } from '@/api/request';

export namespace AuthApi {
  /** 登录参数（与后端 AuthController.login 一致） */
  export interface LoginParams {
    username: string;
    password: string;
    /** 验证码（4 位，与 GET /auth/captcha 会话一致） */
    captchaCode: string;
  }

  /** 登录成功返回（后端 AccountToken） */
  export interface LoginResult {
    userId: number;
    username: string;
    name: string;
    avatar?: string;
    phone?: string;
    email?: string;
    token: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/** 登录：后端 POST /auth/login，表单参数 username, password, captchaCode */
export async function loginApi(data: AuthApi.LoginParams) {
  const params = new URLSearchParams();
  params.set('username', data.username);
  params.set('password', data.password);
  params.set('captchaCode', data.captchaCode);
  const res = await requestClient.post<AuthApi.LoginResult>('/auth/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return res as AuthApi.LoginResult;
}

/** 获取图形验证码：后端 GET /auth/captcha，返回 base64 图片数据 */
export async function getCaptchaApi() {
  return requestClient.get<string>('/auth/captcha');
}

export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', undefined, {
    withCredentials: true,
  });
}

/** 登出：仅前端清空状态，后端无此接口时可忽略报错 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout', undefined, {
    withCredentials: true,
  }).catch(() => undefined);
}

/** 当前用户权限标识列表：后端 GET /auth/permissions 返回菜单列表，提取 code 作为权限码 */
export async function getAccessCodesApi() {
  const list = await requestClient.get<{ code?: string }[]>('/auth/permissions');
  if (!Array.isArray(list)) return [];
  return list.map((item) => item?.code).filter(Boolean) as string[];
}
