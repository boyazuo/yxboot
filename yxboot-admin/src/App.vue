<template>
  <ConfigProvider :locale="zhCN" :theme="getThemeConfig">
    <router-view />
  </ConfigProvider>
</template>
<script setup lang="ts">
  import { useAppConfig } from '@/hooks/config/useAppConfig'
  import { ConfigProvider } from 'ant-design-vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import 'dayjs/locale/zh-cn'

  const { isDark, getThemeConfig } = useAppConfig()

  //监听是否暗黑模式
  watch(
    () => unref(isDark),
    (v) => {
      const htmlRoot = document.getElementById('htmlRoot')
      if (v) {
        htmlRoot?.setAttribute('data-theme', 'dark')
      } else {
        htmlRoot?.setAttribute('data-theme', 'light')
      }
    },
    { immediate: true }
  )
</script>
<style lang="less">
  #app {
    width: 100%;
    height: 100vh;
  }
</style>
