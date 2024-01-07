<template>
  <a-layout-sider
    class="layout-sider"
    :width="getMenuWidth"
    collapsible
    :trigger="null"
    :theme="getMenuTheme"
    v-model:collapsed="getCollapsed"
  >
    <AppLogo v-if="getShowHeaderLogo" />
    <LayoutMenu />
  </a-layout-sider>
</template>
<script lang="ts" setup>
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import LayoutMenu from '../menu/index.vue'
  import AppLogo from './AppLogo.vue'

  const { getCollapsed, getMenuWidth, getMenuTheme } = useMenuSetting()

  const { getShowHeaderLogo } = useHeaderSetting()
</script>
<style lang="less" scope>
  .ant-layout-sider-dark {
    .title {
      color: @white;
    }
  }

  // .ant-layout-sider-light {
  //   .title {
  //     color: var(--ant-primary-color);
  //   }
  // }

  .ant-layout-sider-collapsed {
    .logo {
      img {
        margin-left: 16px;
      }

      .title {
        display: none;
      }
    }
  }
</style>
