import type { UserInfo } from '@yxboot/core';
import { requestClient } from '@/api/request';

/** 后端 SysUser 与前端 UserInfo 的映射 */
export interface SysUserProfile {
  userId?: number;
  username?: string;
  name?: string;
  avatar?: string;
  phone?: string;
  email?: string;
  deptId?: number;
  deptName?: string;
  roleId?: number;
  roleName?: string;
}

function mapProfileToUserInfo(profile: SysUserProfile): UserInfo {
  return {
    id: profile.userId ?? 0,
    username: profile.username ?? '',
    realName: profile.name,
    avatar: profile.avatar,
    email: profile.email,
    phone: profile.phone,
    deptId: profile.deptId,
    deptName: profile.deptName,
  };
}

/** 当前用户信息：后端 GET /auth/profile */
export async function getUserInfoApi() {
  const profile = await requestClient.get<SysUserProfile>('/auth/profile');
  return mapProfileToUserInfo(profile ?? {});
}
