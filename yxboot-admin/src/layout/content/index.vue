<template>
  <a-layout-content :class="[prefixCls, getContentMode]">
    <div class="layout-content">
      <router-view />
    </div>
    <LayoutFooter />
  </a-layout-content>
</template>
<script lang="ts" setup>
  import { useProjectSetting } from '@/hooks/setting'
  import LayoutFooter from '../footer/index.vue'

  const prefixCls = 'layout-content-wrap'
  const { getContentMode } = useProjectSetting()
</script>
<style lang="less" scope>
  .layout-content-wrap {
    position: relative;
    flex: 1 1 auto;
    overflow: auto;
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    &.fixed {
      width: 1200px;
      margin: 0 auto;
    }

    .layout-content {
      flex: 1 1 auto;
      padding: 10px;
    }
  }
</style>
