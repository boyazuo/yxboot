import type { UserInfo } from '@yxboot/core';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore as useCoreAuthStore, usePermissionStore, useUserStore } from '@yxboot/core';
import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { LOGIN_PATH } from '@/constants';
import { defaultHomePath } from '@/preferences';
import { getAccessCodesApi, getUserInfoApi, loginApi, logoutApi } from '@/api';

function resetAllStores() {
  const auth = useCoreAuthStore();
  const user = useUserStore();
  const permission = usePermissionStore();
  auth.clearAuth();
  user.clearUserInfo();
  permission.setAccessRoutes([]);
  permission.setAccessMenus([]);
}

export const useAuthStore = defineStore('app-auth', () => {
  const router = useRouter();
  const coreAuth = useCoreAuthStore();
  const userStore = useUserStore();

  const loginLoading = ref(false);

  async function authLogin(
    params: { username: string; password: string; captchaCode: string },
    onSuccess?: () => Promise<void> | void,
  ) {
    let userInfo: UserInfo | null = null;
    try {
      loginLoading.value = true;
      const res = await loginApi(params);
      const token = (res as { token?: string })?.token;
      if (token) {
        coreAuth.setToken(token, (res as any)?.refreshToken);

        const [fetchUserInfoResult, codes] = await Promise.all([
          fetchUserInfo(),
          getAccessCodesApi().catch(() => []),
        ]);
        userInfo = fetchUserInfoResult ?? null;
        const finalUser = userInfo
          ? { ...userInfo, permissions: Array.isArray(codes) ? codes : userInfo.permissions }
          : null;
        userStore.setUserInfo(finalUser);

        if (onSuccess) {
          await onSuccess();
        } else {
          const redirect = router.currentRoute.value.query?.redirect as string;
          await router.push(
            redirect ? decodeURIComponent(redirect) : defaultHomePath,
          );
        }

        if (userInfo?.realName) {
          message.success(`登录成功：${userInfo.realName}`);
        } else {
          message.success('登录成功');
        }
      }
    } finally {
      loginLoading.value = false;
    }
    return { userInfo };
  }

  async function logout(redirect = true) {
    try {
      await logoutApi();
    } catch {
      // ignore
    }
    resetAllStores();
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? { redirect: encodeURIComponent(router.currentRoute.value.fullPath) }
        : {},
    });
  }

  async function fetchUserInfo(): Promise<UserInfo | null> {
    const info = await getUserInfoApi();
    userStore.setUserInfo(info ?? null);
    return info ?? null;
  }

  return {
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
