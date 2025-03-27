import type { Router, RouteRecordRaw } from 'vue-router'

import { permissions } from '@/api/sys/auth'
import { PageEnum } from '@/enums/pageEnum'
import { convertMenuToRoute, isLayoutComponent, wrapperSingleMenu } from '@/router/helper/routeHelper'
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
  const permissionStore = usePermissionStoreWithOut()

  let routes: RouteRecordRaw[] = []

  const res = await permissions()

  // Dynamically introduce components
  const menus = res.data.filter((item: any) => [1, 2].indexOf(item.type) > -1)

  const menusTree = listToTree(menus, { id: 'menuId' })
  routes = menusTree.map((item) =>
    !isLayoutComponent(item.component) ? wrapperSingleMenu(item) : convertMenuToRoute(item)
  )

  patchHomeAffix(routes)

  routes.forEach((route) => {
    router.addRoute(route as unknown as RouteRecordRaw)
  })

  const code = res.data.filter((item) => !!item.code).map((item) => item.code)
  permissionStore.setMenusCode(code)

  const displyMenusTree = filterDisplayMenus(menusTree)
  permissionStore.setMenus(displyMenusTree)
  permissionStore.setLoaded(true)
}

const filterDisplayMenus = (menus: any[]) => {
  menus.forEach((item: any) => {
    if (item.children) {
      item.children = item.children.filter((child: any) => child.display === 1)
    }
  })
  return menus.filter((item: any) => [1, 2].indexOf(item.type) > -1 && item.display === 1)
}
