import { PageEnum } from '@/enums/pageEnum'
import { removeTabChangeListener } from '@/router/mitt/routeChange'
import { useAppConfigStore } from '@/store/modules/appConfig'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'
import type { Router } from 'vue-router'

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    if (to.path === PageEnum.BASE_LOGIN) {
      const tabStore = useMultipleTabStore()
      const userStore = useUserStore()
      const appConfigStore = useAppConfigStore()
      const permissionStore = usePermissionStore()
      appConfigStore.resetAllState()
      permissionStore.resetState()
      tabStore.resetState()
      userStore.resetState()
      removeTabChangeListener()
    }
  })
}
