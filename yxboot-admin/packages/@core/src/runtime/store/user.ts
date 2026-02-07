/**
 * 用户 Store
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserInfo } from '../../base/types/auth';
import { storage } from '../../base/utils/storage';
import { CACHE_KEYS } from '../../base/constants';

export const useUserStore = defineStore('user', () => {
  // 状态
  const userInfo = ref<UserInfo | null>(storage.get(CACHE_KEYS.USER_INFO));
  const roles = ref<string[]>([]);
  const permissions = ref<string[]>([]);

  // 设置用户信息
  function setUserInfo(info: UserInfo | null) {
    userInfo.value = info;
    if (info) {
      storage.set(CACHE_KEYS.USER_INFO, info);
      roles.value = info.roles || [];
      permissions.value = info.permissions || [];
    } else {
      storage.remove(CACHE_KEYS.USER_INFO);
      roles.value = [];
      permissions.value = [];
    }
  }

  // 清空用户信息
  function clearUserInfo() {
    setUserInfo(null);
  }

  // 判断是否有角色
  function hasRole(role: string): boolean {
    return roles.value.includes(role);
  }

  // 判断是否有权限
  function hasPermission(permission: string): boolean {
    return permissions.value.includes(permission);
  }

  return {
    userInfo,
    roles,
    permissions,
    setUserInfo,
    clearUserInfo,
    hasRole,
    hasPermission,
  };
});
