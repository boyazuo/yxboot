<template>
  <Layout.Header :class="layoutHeaderClass">
    <div class="layout-header__left" v-if="!isSidebarType && !isMixSidebarType">
      <AppLogo v-if="getShowHeaderLogo" />
    </div>
    <div class="layout-header__left" v-if="!isTopMenuType && !isMixTopType">
      <HeaderTrigger />
    </div>

    <div class="layout-header__menu">
      <Breadcrumb v-if="isSidebarType && getShowBread" />
      <LayoutMenu v-if="isMixTopType || isTopMenuType" :mode="MenuModeEnum.HORIZONTAL" :theme="getHeaderTheme" />
    </div>
    <div class="layout-header-action">
      <FullScreen v-if="getShowFullScreen" class="layout-header-action__item" />
      <Setting v-if="getShowSetting" class="layout-header-action__item" />
      <UserDropDown :theme="getHeaderTheme" />
    </div>
  </Layout.Header>
</template>
<script lang="ts" setup>
  import { SettingButtonPositionEnum } from '@/enums/appEnum'
  import { MenuModeEnum } from '@/enums/menuEnum'
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { useRootSetting } from '@/hooks/setting/useRootSetting'
  import { Layout } from 'ant-design-vue'
  import Breadcrumb from '../breadcrumb/index.vue'
  import LayoutMenu from '../menu/index.vue'
  import AppLogo from '../sider/AppLogo.vue'
  import { FullScreen, HeaderTrigger, Setting, UserDropDown } from './components'

  const { isSidebarType, isTopMenuType, isMixTopType, isMixSidebarType } = useMenuSetting()
  const { getShowSettingButton, getSettingButtonPosition } = useRootSetting()
  const { getShowHeaderLogo, getShowBread, getShowFullScreen, getShowHeader } = useHeaderSetting()

  //主题
  const { getHeaderTheme } = useHeaderSetting()
  const layoutHeaderClass = computed(() => {
    return {
      'layout-header': true,
      [`layout-header__${unref(getHeaderTheme)}`]: true
    }
  })

  const getShowSetting = computed(() => {
    if (!unref(getShowSettingButton)) {
      return false
    }
    const settingButtonPosition = unref(getSettingButtonPosition)

    if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
      return unref(getShowHeader)
    }
    return settingButtonPosition === SettingButtonPositionEnum.HEADER
  })
</script>
<style lang="less" scoped>
  .layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    background-color: @header-bg-color-base;
    box-shadow: 0 1px 4px #00152914;
    transition: all 0.2s ease-in-out;
    z-index: 11;

    &__dark {
      border-bottom: 1px solid @border-color-base;
      color: #fff !important;

      .logo {
        :deep(.title) {
          color: #fff !important;
        }
      }

      .layout-header-action {
        &__item {
          color: @text-color-base;

          &:hover {
            background-color: @header-dark-bg-hover-color;
          }
        }
      }

      .layout-header-trigger {
        &:hover {
          background-color: @header-dark-bg-hover-color;
        }
      }
    }

    &__light {
      color: #333 !important;

      .logo {
        :deep(.title) {
          color: #333 !important;
        }
      }

      .layout-header-action {
        &__item {
          color: @text-color-base;

          &:hover {
            background-color: @header-light-bg-hover-color;
          }
        }
      }

      .layout-header-trigger {
        &:hover {
          background-color: @header-light-bg-hover-color;
        }
      }
    }

    &-trigger {
      height: @header-height;
      font-size: 18px !important;
      padding: 0 10px;
      cursor: pointer;
      transition: color 0.3s;
    }

    &__left {
      .logo {
        :deep(.title) {
          color: #333;
        }
      }
    }

    &__menu {
      padding: 0 60px;
      flex-grow: 1;
      flex-shrink: 1;

      .ant-menu-horizontal {
        border-bottom: none;

        &.ant-menu {
          line-height: 48px;
          background-color: rgb(0 0 0 / 0%);
        }
      }
    }

    &-action {
      display: flex;
      align-items: center;
      margin-right: 10px;

      &__item {
        display: flex !important;
        align-items: center;
        height: @header-height;
        padding: 0 10px;
        font-size: 1.2em;
        color: @text-color-base;
        cursor: pointer;
      }
    }
  }
</style>
