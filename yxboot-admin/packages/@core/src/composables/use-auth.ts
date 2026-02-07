/**
 * 组合式函数 - useAuth
 */
import { computed } from 'vue';
import { useAuthStore } from '../runtime/store/auth';
import { useUserStore } from '../runtime/store/user';

export function useAuth() {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  // 是否已认证
  const isAuthenticated = computed(() => authStore.isAuthenticated);

  // 用户信息
  const userInfo = computed(() => userStore.userInfo);

  // 登出
  function logout() {
    authStore.clearAuth();
    userStore.clearUserInfo();
  }

  return {
    isAuthenticated,
    userInfo,
    logout,
  };
}
