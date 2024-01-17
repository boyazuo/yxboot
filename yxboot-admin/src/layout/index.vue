<template>
  <a-layout class="layout">
    <LayoutSider v-if="getShowSider" />
    <a-layout :class="`${prefixCls}-main`">
      <LayoutHeader v-if="getShowHeader" />
      <Tabs v-if="getShowMultipleTab" />
      <LayoutContent />
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import LayoutHeader from './header/index.vue'
  import LayoutSider from './sider/index.vue'
  // import LayoutTags from './tags/index.vue'
  import { useHeaderSetting, useMultipleTabSetting, useSiderSetting } from '@/hooks/setting'
  import LayoutContent from './content/index.vue'
  import Tabs from './tabs/index.vue'

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
