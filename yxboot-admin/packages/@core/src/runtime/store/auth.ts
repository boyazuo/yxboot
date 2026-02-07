/**
 * 认证 Store
 */
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { AuthState } from '../../base/types/auth';
import { storage } from '../../base/utils/storage';
import { CACHE_KEYS } from '../../base/constants';

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const token = ref<string | null>(storage.get(CACHE_KEYS.TOKEN));
  const refreshToken = ref<string | null>(storage.get(CACHE_KEYS.REFRESH_TOKEN));
  const loginTime = ref<number | null>(null);
  const expireTime = ref<number | null>(null);

  // 计算属性
  const isAuthenticated = computed(() => !!token.value);

  // 设置 Token
  function setToken(value: string | null, refresh?: string | null) {
    token.value = value;
    if (value) {
      storage.set(CACHE_KEYS.TOKEN, value);
      loginTime.value = Date.now();
    } else {
      storage.remove(CACHE_KEYS.TOKEN);
      loginTime.value = null;
    }

    if (refresh !== undefined) {
      refreshToken.value = refresh;
      if (refresh) {
        storage.set(CACHE_KEYS.REFRESH_TOKEN, refresh);
      } else {
        storage.remove(CACHE_KEYS.REFRESH_TOKEN);
      }
    }
  }

  // 清空认证信息
  function clearAuth() {
    setToken(null, null);
    expireTime.value = null;
  }

  return {
    token,
    refreshToken,
    loginTime,
    expireTime,
    isAuthenticated,
    setToken,
    clearAuth,
  };
});
