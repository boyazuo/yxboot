/**
 * 认证相关类型
 */

/** 用户信息 */
export interface UserInfo {
  /** 用户 ID */
  id: string | number;
  /** 用户名 */
  username: string;
  /** 真实姓名 */
  realName?: string;
  /** 头像 */
  avatar?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  phone?: string;
  /** 角色列表 */
  roles?: string[];
  /** 权限列表 */
  permissions?: string[];
  /** 部门 ID */
  deptId?: string | number;
  /** 部门名称 */
  deptName?: string;
}

/** 登录参数 */
export interface LoginParams {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 验证码 */
  captcha?: string;
  /** 记住我 */
  remember?: boolean;
}

/** 登录结果 */
export interface LoginResult {
  /** 访问令牌 */
  token: string;
  /** 刷新令牌 */
  refreshToken?: string;
  /** 过期时间（秒） */
  expiresIn?: number;
  /** 用户信息 */
  userInfo?: UserInfo;
}

/** 认证状态 */
export interface AuthState {
  /** 访问令牌 */
  token: string | null;
  /** 刷新令牌 */
  refreshToken: string | null;
  /** 登录时间 */
  loginTime: number | null;
  /** 过期时间 */
  expireTime: number | null;
}
