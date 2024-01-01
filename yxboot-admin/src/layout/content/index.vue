<template>
  <a-layout-content class="layout-content-wrap">
    <div class="layout-content">
      <router-view />
    </div>
    <LayoutFooter />
  </a-layout-content>
</template>
<script lang="ts" setup>
  import LayoutFooter from '../footer/index.vue'
</script>
<style lang="less" scope>
  .layout-content-wrap {
    position: relative;
    flex: 1 1 auto;
    overflow: auto;
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    .layout-content {
      flex: 1 1 auto;
      padding: 10px;
    }
  }
</style>
