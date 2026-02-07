import type { App } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { setupRouterGuard } from '@/router/guard/index'
import { basicRoutes } from './routes'

const router = createRouter({
  // 创建 WebHistory
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 应该添加到路由的初始路由列表
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
})
export default router

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
  setupRouterGuard(router)
}
