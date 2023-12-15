<template>
  <a-config-provider :locale="zhCN" :theme="themeConfig">
    <router-view />
  </a-config-provider>
</template>
<script setup lang="ts">
  import { useDarkModeTheme } from '@/hooks/setting/useDarkModeTheme'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import 'dayjs/locale/zh-cn'

  const { isDark, darkTheme } = useDarkModeTheme()

  const themeConfig = computed(() =>
    Object.assign(
      {
        token: {
          borderRadius: 4,
          colorPrimary: '#0960bd',
          colorSuccess: '#55D187',
          colorWarning: '#EFBD47',
          colorError: '#ED6F6F',
          colorInfo: '#0960bd'
        }
      },
      isDark.value ? darkTheme : {}
    )
  )
</script>
<style lang="less">
  #app {
    width: 100%;
    height: 100vh;
  }
</style>
