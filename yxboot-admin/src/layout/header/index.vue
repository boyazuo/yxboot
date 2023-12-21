<template>
  <a-layout-header :class="layoutHeaderClass">
    <div class="layout-header__left" v-if="!isSidebarType">
      <AppLogo />
    </div>
    <div class="layout-header__left" v-if="!isTopMenuType">
      <Icon v-if="getCollapsed" @click="toggleCollapsed" class="trigger" icon="ant-design:menu-unfold-outlined" />
      <Icon v-else @click="toggleCollapsed" class="trigger" icon="ant-design:menu-fold-outlined" />
    </div>
    <div class="layout-header__menu">
      <LayoutMenu v-if="isMixType || isTopMenuType" :mode="MenuModeEnum.HORIZONTAL" :theme="getHeaderTheme" />
    </div>
    <div class="layout-header__action">
      <Icon @click="toggle" class="fullscreen" :icon="fullscreenIcon" size="18" />
      <Icon @click="openSettingDrawer" class="setting" icon="ant-design:setting-outlined" size="18" />
      <a-dropdown placement="bottomRight" class="user-dropdown">
        <a-avatar :src="userStoreData?.avatar">{{ userStoreData?.name }}</a-avatar>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="$router.push({ path: '/personal/index' })">
              <Icon icon="ant-design:user-outlined" /> 个人中心
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click.prevent="handleLogout">
              <Icon icon="ant-design:poweroff-outlined" /> 退出系统
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <SettingDrawer @register="registerSettingDrawer" />
  </a-layout-header>
</template>
<script lang="ts" setup>
  import { useDrawer } from '@/components/Drawer'
  import { MenuModeEnum } from '@/enums/menuEnum'
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { useUserStoreWithOut } from '@/store/modules/user'
  import { useFullscreen } from '@vueuse/core'
  import LayoutMenu from '../menu/index.vue'
  import SettingDrawer from '../setting/SettingDrawer.vue'
  import AppLogo from '../sider/AppLogo.vue'

  const userStore = useUserStoreWithOut()

  const { isSidebarType, isTopMenuType, isMixType, getCollapsed, toggleCollapsed } = useMenuSetting()

  const { isFullscreen, toggle } = useFullscreen()
  const fullscreenIcon = computed(() => {
    return isFullscreen.value ? 'ant-design:fullscreen-exit-outlined' : 'ant-design:fullscreen-outlined'
  })

  const userStoreData: any = computed(() => userStore.getUser)

  const [registerSettingDrawer, { openDrawer }] = useDrawer()

  const openSettingDrawer = () => {
    openDrawer()
  }

  const handleLogout = async () => {
    await userStore.logout()
    window.location.reload()
  }
  //主题
  const { getHeaderTheme } = useHeaderSetting()
  const layoutHeaderClass = computed(() => {
    return {
      'layout-header': true,
      [`layout-header__${unref(getHeaderTheme)}`]: true
    }
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
    background-color: var(--header-bg-color);
    box-shadow: 0 1px 4px #00152914;
    transition: all 0.2s ease-in-out;
    z-index: 11;

    &__dark {
      color: #fff !important;

      .logo {
        :deep(.title) {
          color: #fff !important;
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
    }

    .trigger {
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

    &__action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;

      .fullscreen,
      .setting {
        margin-right: 20px;
        cursor: pointer;
      }

      .user-dropdown {
        border: 1px solid #ccc;
        overflow: hidden;
        font-size: 12px;
        cursor: pointer;
        align-items: center;
      }
    }
  }
</style>
