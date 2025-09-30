import type { RouteRecordRaw } from 'vue-router'
import type { SysMenu } from '@/api/model/sysModel'
import { LAYOUT, PARENT_LAYOUT } from '@/router/constant'
import type { Menu } from '@/router/types'
import { findPath } from '@/utils/helper/trees'

// export const ERROR_PAGE = () => import('@/views/exception/404.vue')

const allPages = import.meta.glob(`@/views/**/*.vue`)

export function isLayoutComponent(component) {
  if (['LAYOUT', 'PARENTLAYOUT'].indexOf(component.toUpperCase()) > -1) {
    return true
  }
  return false
}

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[]
  return (menuList || []).map((item) => item.path)
}

export function convertMenuToRoute(menu: SysMenu): RouteRecordRaw {
  const resolveComponent = (component: string) => {
    if (component.toUpperCase() === 'LAYOUT') {
      return LAYOUT
    } else if (component.toUpperCase() === 'PARENTLAYOUT') {
      return PARENT_LAYOUT
    } else {
      const key = `/src/views${component}`
      return allPages[key]
    }
  }

  const component = resolveComponent(menu.component)
  return {
    path: menu.path,
    name: menu.name + (component === LAYOUT ? '_layout' : ''),
    component: component,
    props: true,
    children: menu.children.map((item) => convertMenuToRoute(item)),
    meta: {
      title: menu.name,
      cache: false,
      hideBreadcrumb: component === LAYOUT || component === PARENT_LAYOUT,
      ...menu,
    },
  } as RouteRecordRaw
}

export function wrapperSingleMenu(menu: SysMenu): RouteRecordRaw {
  return {
    path: `${menu.path}_parent`,
    name: menu.name + '_parent_layout',
    component: LAYOUT,
    props: true,
    children: [convertMenuToRoute(menu)],
    meta: {
      cache: false,
      hideBreadcrumb: true,
    },
  } as RouteRecordRaw
}
