import type { Router } from 'vue-router'

import { ACCESS_TOKEN } from '@/enums/cacheEnum'
import { PageEnum } from '@/enums/pageEnum'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
import { loadPermissionRoutes } from '@/router/routes/dynamic'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { storage } from '@/utils/storage'

const LOGIN_PATH = PageEnum.BASE_LOGIN
const whitePathList: PageEnum[] = [LOGIN_PATH]

export function createPermissionGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    const token = storage.get(ACCESS_TOKEN)

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        try {
          next((to.query?.redirect as string) || '/')
          return
        } catch {}
      }
      next()
      return
    }

    // token does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }
      next(redirectData)
      return
    }

    // Jump to the 404 page after processing the login
    if (from.path === LOGIN_PATH && to.name === PAGE_NOT_FOUND_ROUTE.name && to.fullPath !== PageEnum.BASE_HOME) {
      next(PageEnum.BASE_HOME)
      return
    }

    if (permissionStore.isLoaded) {
      next()
      return
    }

    await loadPermissionRoutes(router)

    // router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}
