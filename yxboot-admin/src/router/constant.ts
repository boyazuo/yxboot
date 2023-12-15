import { RouterView } from 'vue-router'
export const REDIRECT_NAME = 'Redirect'

export const PARENT_LAYOUT_NAME = 'ParentLayout'

export const PAGE_NOT_FOUND_NAME = 'PageNotFound'

export const EXCEPTION_COMPONENT = () => import('@/layout/content/other/404.vue')

/**
 * @description: default layout
 */
export const LAYOUT = () => import('@/layout/index.vue')

/**
 * @description: parent-layout
 */
export const PARENT_LAYOUT = {
  name: PARENT_LAYOUT_NAME,
  render: () => h(RouterView)
}
