<template>
  <a-config-provider :locale="zhCN" :theme="theme" v-bind="themeOverrides">
    <router-view />
  </a-config-provider>
</template>
<script setup lang="ts">
  import { useDarkModeTheme } from '@/hooks/setting/useDarkModeTheme'
  import { useAppTheme } from '@/hooks/web/useTheme'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import 'dayjs/locale/zh-cn'

  const { isDark, themeColors } = useAppTheme()
  const { darkTheme } = useDarkModeTheme()

  //监听是否暗黑模式
  watch(
    () => unref(isDark),
    (v) => {
      document.getElementsByTagName('html')[0].className = v ? 'dark' : ''
    },
    { immediate: true }
  )

  const theme = computed(() => {
    return unref(isDark) ? darkTheme : null
  })

  const themeOverrides = computed(() => {
    return {
      themeOverrides: {
        common: {
          ...unref(themeColors)
        }
      }
    }
  })

  // const themeConfig = computed(() =>
  //   Object.assign(
  //     {
  //       token: {
  //         borderRadius: 4,
  //         ...unref(themeColors)
  //         // colorPrimary: '#0960bd',
  //         // colorSuccess: '#55D187',
  //         // colorWarning: '#EFBD47',
  //         // colorError: '#ED6F6F',
  //         // colorInfo: '#0960bd'
  //       }
  //     },
  //     isDark.value ? darkTheme : {}
  //   )
  // )
</script>
<style lang="less">
  #app {
    width: 100%;
    height: 100vh;
  }
</style>
