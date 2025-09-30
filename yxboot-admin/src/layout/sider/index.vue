<template>
  <a-layout-sider
    class="layout-sider"
    :width="getWidth"
    collapsible
    :trigger="null"
    :theme="getSiderTheme"
    v-model:collapsed="isCollapsed"
  >
    <AppLogo v-if="getShowHeaderLogo" />
    <LayoutMenu v-if="!isMixSidebarType" />
    <MixMenu :mode="MenuModeEnum.INLINE" v-else />
  </a-layout-sider>
</template>
<script lang="ts" setup>
import { MenuModeEnum } from '@/enums/menuEnum'
import { useHeaderSetting, useMenuSetting, useSiderSetting } from '@/hooks/setting'
import LayoutMenu from '../menu/index.vue'
import MixMenu from '../mix-menu/index.vue'
import AppLogo from './AppLogo.vue'

const { getCollapsed, getWidth, getSiderTheme } = useSiderSetting()
const { isMixSidebarType } = useMenuSetting()

const isCollapsed = computed(() => unref(isMixSidebarType) || unref(getCollapsed))

const { getShowHeaderLogo } = useHeaderSetting()
</script>
<style lang="less" scope>
  .ant-layout-sider-dark {
    .title {
      color: @white;
    }
  }

  .ant-layout-sider-light {
    .title {
      color: var(--ant-primary-color);
    }
  }

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
