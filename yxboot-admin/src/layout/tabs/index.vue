<template>
  <div class="tabs">
    <a-tabs
      type="editable-card"
      size="small"
      hide-add
      :tabBarGutter="3"
      :activeKey="activeKeyRef"
      @change="handleChange"
      @edit="handleEdit"
    >
      <a-tab-pane
        v-for="tab in getTabsState"
        :key="tab.query ? tab.fullPath : tab.path"
        :closable="!(tab && tab.meta && tab.meta.affix)"
      >
        <template #tab>
          <TabContent :tabItem="tab" />
        </template>
      </a-tab-pane>

      <template #rightExtra v-if="getShowRedo || getShowQuick">
        <TabRedo v-if="getShowRedo" />
        <TabContent isExtra :tabItem="$route" v-if="getShowQuick" />
        <FoldButton v-if="getShowFold" />
      </template>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'
  import { REDIRECT_NAME } from '@/router/constant'
  import { listenerRouteChange } from '@/router/mitt/routeChange'
  import { useMultipleTabStore } from '@/store/modules/multipleTab'
  import { useUserStore } from '@/store/modules/user'
  import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
  import { useRouter } from 'vue-router'
  import FoldButton from './components/FoldButton.vue'
  import TabContent from './components/TabContent.vue'
  import TabRedo from './components/TabRedo.vue'
  import { initAffixTabs, useTabsDrag } from './useMultipleTabs'

  const router = useRouter()
  const tabStore = useMultipleTabStore()
  const userStore = useUserStore()

  const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting()

  const activeKeyRef = ref('')
  const affixTextList = initAffixTabs()

  useTabsDrag(affixTextList)

  const getTabsState = computed(() => {
    return tabStore.getTabList.filter((item) => !item.meta?.hideTab)
  })

  const unClose = computed(() => unref(getTabsState).length === 1)

  function handleChange(activeKey: any) {
    activeKeyRef.value = activeKey
    router.push(activeKey)
  }

  // Close the current tab
  function handleEdit(targetKey: string) {
    // Added operation to hide, currently only use delete operation
    if (unref(unClose)) {
      return
    }

    tabStore.closeTabByKey(targetKey, router)
  }

  listenerRouteChange((route) => {
    const { name } = route
    if (name === REDIRECT_NAME || !route || !userStore.getToken) {
      return
    }

    const { path, fullPath, meta = {} } = route
    const { currentActiveMenu, hideTab } = meta as RouteMeta
    const isHide = !hideTab ? null : currentActiveMenu
    const p = isHide || fullPath || path
    if (activeKeyRef.value !== p) {
      activeKeyRef.value = p as string
    }

    if (isHide) {
      const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu)

      findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized)
    } else {
      tabStore.addTab(unref(route))
    }
  })
</script>
<style lang="less">
  @import url('./index.less');
</style>
@/router/mitt/routeChange
