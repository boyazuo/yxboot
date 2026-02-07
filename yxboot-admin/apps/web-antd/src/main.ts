import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import { setupRouter } from './router';

// 导入核心样式
import '@yxboot/core/styles';
// 导入 Tailwind CSS
import './styles/index.css';

async function bootstrap() {
  const app = createApp(App);

  // 配置 Pinia
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);

  // 配置路由
  await setupRouter(app);

  // 挂载应用
  app.mount('#app');
}

bootstrap();
