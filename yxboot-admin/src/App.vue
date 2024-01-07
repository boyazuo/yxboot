<template>
  <ConfigProvider :locale="zhCN" :theme="theme">
    <router-view />
  </ConfigProvider>
</template>
<script setup lang="ts">
  import { useAppTheme } from '@/hooks/web/useTheme'
  import { _merge } from '@/utils'
  import { ConfigProvider } from 'ant-design-vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import 'dayjs/locale/zh-cn'

  const { isDark, getTheme } = useAppTheme()

  //监听是否暗黑模式
  watch(
    () => unref(isDark),
    (v) => {
      console.log('暗黑模式', v)
      const htmlRoot = document.getElementById('htmlRoot')
      if (v) {
        htmlRoot?.setAttribute('data-theme', 'dark')
      } else {
        htmlRoot?.setAttribute('data-theme', 'light')
      }
    },
    { immediate: true }
  )

  const theme = computed(() => {
    return _merge({}, unref(getTheme), {
      token: {
        borderRadius: 4,
        colorPrimary: '#0960bd',
        colorSuccess: '#55D187',
        colorWarning: '#EFBD47',
        colorError: '#ED6F6F',
        colorInfo: '#0960bd'
      }
    })
  })
</script>
<style lang="less">
  #app {
    width: 100%;
    height: 100vh;
  }
</style>
