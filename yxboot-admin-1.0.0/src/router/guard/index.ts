import { Modal, notification } from 'ant-design-vue'
import type { RouteLocationNormalized, Router } from 'vue-router'
import { useProjectSetting } from '@/hooks/setting'
import { setRouteChange } from '@/router/mitt/routeChange'
import { AxiosCanceler } from '@/utils/http/axios/axiosCancel'
import { warn } from '@/utils/log'
import { createPermissionGuard } from './permissionGuard'
import { createStateGuard } from './stateGuard'

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createHttpGuard(router)
  createScrollGuard(router)
  createMessageGuard(router)
  createPermissionGuard(router)
  createStateGuard(router)
}

/**
 * Hooks for handling page state
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()

  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path)
    // Notify routing changes
    setRouteChange(to)

    return true
  })

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true)
  })
}

/**
 * The interface used to close the current page to complete the request when the route is switched
 * @param router
 */
function createHttpGuard(router: Router) {
  const { getRemoveAllHttpPending } = useProjectSetting()
  let axiosCanceler: Nullable<AxiosCanceler>
  if (unref(getRemoveAllHttpPending)) {
    axiosCanceler = new AxiosCanceler()
  }
  router.beforeEach(async () => {
    // Switching the route will delete the previous request
    axiosCanceler?.removeAllPending()
    return true
  })
}

// Routing switch back to the top
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href)
  }

  const body = document.body

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0)
    return true
  })
}

/**
 * Used to close the message instance when the route is switched
 * @param router
 */
export function createMessageGuard(router: Router) {
  const { getCloseMessageOnSwitch } = useProjectSetting()

  router.beforeEach(async () => {
    try {
      if (unref(getCloseMessageOnSwitch)) {
        Modal.destroyAll()
        notification.destroy()
      }
    } catch (error) {
      warn('message guard error:' + error)
    }
    return true
  })
}
