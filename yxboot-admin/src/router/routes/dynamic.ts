import type { Router, RouteRecordRaw } from 'vue-router'

import { permissions } from '@/api/sys/auth'
import { PageEnum } from '@/enums/pageEnum'
import { useMessage } from '@/hooks/web/useMessage'
import { convertMenuToRoute, isLayoutComponent, wrapperSingleMenu } from '@/router/helper/routeHelper'
import { HOME_ROUTE } from '@/router/routes'
import { ERROR_LOG_ROUTE } from '@/router/routes/basic'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { listToTree } from '@/utils/helper/trees'

/**
 * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
 * */
const patchHomeAffix = (routes: RouteRecordRaw[]) => {
  if (!routes || routes.length === 0) return
  let homePath: string = PageEnum.BASE_HOME

  function patcher(routes: RouteRecordRaw[], parentPath = '') {
    if (parentPath) parentPath = parentPath + '/'
    routes.forEach((route: RouteRecordRaw) => {
      const { path, children, redirect } = route
      const currentPath = path.startsWith('/') ? path : parentPath + path
      if (currentPath === homePath) {
        if (redirect) {
          homePath = route.redirect! as string
        } else {
          route.meta = Object.assign({}, route.meta, { affix: true })
          throw new Error('end')
        }
      }
      children && children.length > 0 && patcher(children, currentPath)
    })
  }

  try {
    patcher(routes)
  } catch (e) {
    // 已处理完毕跳出循环
  }
  return
}

export async function loadPermissionRoutes(router: Router) {
  const { createMessage } = useMessage()
  const permissionStore = usePermissionStoreWithOut()

  let routes: RouteRecordRaw[] = []

  createMessage.loading({
    content: '菜单加载中...',
    duration: 1
  })

  const res = await permissions()

  // Dynamically introduce components
  //let menus = res.data || []
  const menus = res.data.filter((item: any) => [1, 2].indexOf(item.type) > -1)
  const menusTree = listToTree(menus, { id: 'menuId' })
  const code = res.data.filter((item) => !!item.code).map((item) => item.code)
  permissionStore.setMenus(menusTree)
  permissionStore.setMenusCode(code)

  routes = menusTree.map((item) =>
    !isLayoutComponent(item.component) ? wrapperSingleMenu(item) : convertMenuToRoute(item)
  )

  routes.push(HOME_ROUTE)
  routes.push(ERROR_LOG_ROUTE)

  permissionStore.setLoaded(true)
  patchHomeAffix(routes)

  routes.forEach((route) => {
    router.addRoute(route as unknown as RouteRecordRaw)
  })
}
