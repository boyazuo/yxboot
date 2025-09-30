<template>
  <a-config-provider :locale="zhCN" :theme="getThemeConfig">
    <router-view :key="$route.fullPath" />
  </a-config-provider>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useAppConfig } from '@/hooks/config/useAppConfig'
import 'dayjs/locale/zh-cn'

const { getThemeConfig } = useAppConfig()
</script>
<style lang="less">
  #app {
    width: 100%;
    height: 100vh;
  }
</style>
