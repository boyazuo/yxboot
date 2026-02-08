import { createApp, watchEffect } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import { initPreferences, useAppStore } from '@yxboot/core';
import '@yxboot/core/styles';
import App from './App.vue';
import { setupRouter, router } from './router';
import { appName, defaultHomePath } from './preferences';
import './styles/index.css';

const PREFERENCES_NAMESPACE = '__yxboot__';

export async function bootstrap() {
  // 优先初始化偏好设置（持久化、主题等）
  initPreferences({
    namespace: PREFERENCES_NAMESPACE,
    overrides: {
      app: { name: appName, defaultHomePath },
    },
  });

  const app = createApp(App);

  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);

  app.use(Antd);

  await setupRouter(app);

  // 移动端由 preferences 监听，此处仅兼容 appStore（若布局仍用 appStore.mobile 可后续移除）
  const appStore = useAppStore();
  const checkMobile = () => appStore.setMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener('resize', checkMobile);

  // 动态标题：从 preferences 取应用名
  watchEffect(() => {
    const title = router.currentRoute.value.meta?.title;
    document.title = title ? `${title} - ${appName}` : appName;
  });

  app.mount('#app');
}
