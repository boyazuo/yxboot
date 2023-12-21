import 'ant-design-vue/dist/reset.css'
import 'virtual:windi-devtools'
import 'virtual:windi.css'
// Register icon sprite
import 'virtual:svg-icons-register'

import App from './App.vue'

import { registerGlobComp } from '@/components/registerGlobComp'
import { setupGlobDirectives } from '@/directives'
import { initAppConfigStore } from '@/logics/initAppConfig'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'

async function bootstrap() {
  const app = createApp(App)

  // 注册全局 Antd UI组件
  registerGlobComp(app)

  // 挂载状态管理
  setupStore(app)

  // Initialize internal system configuration
  // 初始化内部系统配置
  initAppConfigStore()

  // 挂载路由
  setupRouter(app)

  // Register global directive
  // 注册全局指令
  setupGlobDirectives(app)

  app.mount('#app')
}

bootstrap()
