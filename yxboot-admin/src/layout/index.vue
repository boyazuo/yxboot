<template>
  <a-layout class="layout">
    <LayoutHeader fixed v-if="getShowHeader && !isSidebarType" />
    <a-layout>
      <LayoutSider v-if="getShowSider" />
      <a-layout :class="`${prefixCls}-main`">
        <LayoutHeader v-if="getShowHeader && isSidebarType" />
        <Tabs v-if="getShowMultipleTab" />
        <LayoutContent />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import LayoutHeader from './header/index.vue'
  import LayoutSider from './sider/index.vue'
  // import LayoutTags from './tags/index.vue'
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'
  import { useSiderSetting } from '@/hooks/setting/useSiderSetting'
  import LayoutContent from './content/index.vue'
  import Tabs from './tabs/index.vue'

  const { isSidebarType } = useMenuSetting()
  const { getShowSider } = useSiderSetting()
  const { getShowHeader } = useHeaderSetting()
  const { getShowMultipleTab } = useMultipleTabSetting()

  const prefixCls = 'layout'
</script>
<style lang="less" scope>
  .layout {
    display: flex;

    /* width: calc(100% - 1px); */
    width: 100%;
    min-height: 100%;
    background-color: @content-bg;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
    }

    &-main {
      width: 100%;
      height: 100vh;
    }
  }
</style>
