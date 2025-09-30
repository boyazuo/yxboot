<template>
  <div :class="getClass" @click="toggleDarkMode">
    <div :class="`${prefixCls}-inner`"></div>
    <SvgIcon size="14" name="sun" />
    <SvgIcon size="14" name="moon" />
  </div>
</template>
<script lang="ts" setup>
import { SvgIcon } from '@/components/Icon'
import { ThemeEnum } from '@/enums/appEnum'
import { HandlerEnum } from '@/enums/handlerEnum'
import { useAppConfig } from '@/hooks/config/useAppConfig'

// const { isDark, toggleTheme } = useAppTheme()
const { isDark, baseHandler } = useAppConfig()

const prefixCls = 'dark-switch'

// const isDark = computed(() => getDarkMode.value === ThemeEnum.DARK)

const getClass = computed(() => [
  prefixCls,
  {
    [`${prefixCls}--dark`]: unref(isDark),
  },
])

function toggleDarkMode() {
  baseHandler(HandlerEnum.CHANGE_THEME, isDark.value ? ThemeEnum.LIGHT : ThemeEnum.DARK)
  // toggleTheme(!isDark.value)
  // const darkMode = !isDark.value ? ThemeEnum.LIGHT : ThemeEnum.DARK
  // setDarkMode(darkMode)
  // updateHeaderBgColor()
  // updateDarkTheme(darkMode)
  // updateSidebarBgColor()
}
</script>
<style lang="less" scoped>
  @prefix-cls: ~'dark-switch';

  html[data-theme='dark'] {
    .@{prefix-cls} {
      border: 1px solid rgb(196 188 188);
    }
  }

  .@{prefix-cls} {
    position: relative;
    display: flex;
    width: 50px;
    height: 26px;
    padding: 0 6px;
    margin-left: auto;
    cursor: pointer;
    background-color: #151515;
    border-radius: 30px;
    justify-content: space-between;
    align-items: center;

    &-inner {
      position: absolute;
      z-index: 1;
      width: 18px;
      height: 18px;
      background-color: #fff;
      border-radius: 50%;
      transition:
        transform 0.5s,
        background-color 0.5s;
      will-change: transform;
    }

    &--dark {
      .@{prefix-cls}-inner {
        transform: translateX(calc(100% + 2px));
      }
    }
  }
</style>
