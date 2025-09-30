<template>
  <a-menu
    class="yxboot-menus"
    v-if="menus.length > 0"
    v-model:selectedKeys="menuState.selectedKeys"
    :openKeys="menuState.openKeys"
    :theme="menuTheme"
    :mode="getMenuMode"
    @click="handleMenuClick"
    @open-change="handleOpenChange"
  >
    <template v-for="menu in menus">
      <MenuGroup v-if="isMenuGroup(menu)" :key="`menu_${menu.path}`" :menu="menu" />
      <Menu v-else :key="`menu_${parseMenu(menu).path}`" :menu="parseMenu(menu)" />
    </template>
  </a-menu>
</template>
<script lang="ts" setup>
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
import { SysMenu } from '@/api/model/sysModel'
import { MenuModeEnum } from '@/enums/menuEnum'
import { useSiderSetting } from '@/hooks/setting'
import { REDIRECT_NAME } from '@/router/constant'
import { getAllParentPath } from '@/router/helper/routeHelper'
import { listenerRouteChange } from '@/router/mitt/routeChange'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { propTypes } from '@/utils/propTypes'
import Menu from './components/Menu.vue'
import MenuGroup from './components/MenuGroup.vue'
import type { Key, MenuState } from './types'

const { getShowSider, getCollapsed, getSiderTheme } = useSiderSetting()

const props = defineProps({
  theme: propTypes.oneOf(['light', 'dark']),
  // 菜单模式
  mode: propTypes.oneOf([MenuModeEnum.INLINE, MenuModeEnum.HORIZONTAL]).def(MenuModeEnum.INLINE),
})

const menuState = reactive<MenuState>({
  defaultSelectedKeys: [],
  openKeys: [],
  selectedKeys: [],
  collapsedOpenKeys: [],
})

const { currentRoute } = useRouter()
const router = useRouter()
const permission = usePermissionStoreWithOut()
const menus = permission.getMenus
const isClickGo = ref(false)

const menuTheme = computed(() => props.theme || unref(getSiderTheme))
const getMenuMode = computed(() => {
  if (unref(getCollapsed) && unref(getShowSider)) {
    return MenuModeEnum.VERTICAL
  } else {
    return props.mode
  }
})

const handleMenuClick = ({ key }: { key: string }) => {
  menuState.selectedKeys = [key]
  isClickGo.value = true
  if (/http(s)?:/.test(key)) {
    window.open(key)
  } else {
    router.push(key)
  }
}

const handleOpenChange = (openKeys: string[]) => {
  const rootSubMenuKeys: Key[] = []
  for (const { children, path } of unref(menus)) {
    if (children && children.length > 0) {
      rootSubMenuKeys.push(path)
    }
  }

  if (unref(getShowSider) && !unref(getCollapsed)) {
    const latestOpenKey = openKeys.find((key) => menuState.openKeys.indexOf(key) === -1)
    if (rootSubMenuKeys.indexOf(latestOpenKey as string) === -1) {
      menuState.openKeys = openKeys
    } else {
      menuState.openKeys = latestOpenKey ? [latestOpenKey] : []
    }
  }
}

const isMenuGroup = (menu: SysMenu) => {
  if (!menu.children || menu.children.length === 0) {
    return false
  }
  if (menu.children && menu.children.length === 1) {
    const [child] = menu.children
    return child.name !== menu.name
  }
  return true
}

const parseMenu = (menu: SysMenu) => (menu.children && menu.children.length > 0 ? menu.children[0] : menu)

listenerRouteChange((route) => {
  if (route.name === REDIRECT_NAME) return
  if (route.meta?.display !== 1) return
  handleMenuChange(route)
})

async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
  if (unref(isClickGo)) {
    isClickGo.value = false
    return
  }
  const path: string = (route || unref(currentRoute)).path
  setOpenKeys(path)
  if (unref(getShowSider) && !unref(getCollapsed)) {
    const parentPaths = await getAllParentPath(menus, path)
    menuState.selectedKeys = parentPaths
  }
}

async function setOpenKeys(path: string) {
  if (getMenuMode.value === MenuModeEnum.HORIZONTAL) {
    return
  }
  const menuList = toRaw(menus)
  if (menuList?.length === 0) {
    menuState.openKeys = []
    return
  }
  menuState.openKeys = getAllParentPath(menuList, path)
}
</script>
<style lang="less" scope>
  .yxboot-menus {
    &.ant-menu-horizontal {
      display: flex;
      align-items: center;

      &.ant-menu-dark {
        background-color: transparent;

        .ant-menu-submenu:hover,
        .ant-menu-item-open,
        .ant-menu-submenu-open,
        .ant-menu-item-selected,
        .ant-menu-submenu-selected,
        .ant-menu-item:hover,
        .ant-menu-item-active,
        .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
        .ant-menu-submenu-active,
        .ant-menu-submenu-title:hover {
          color: #fff;
          background-color: @top-menu-active-bg-color !important;
        }

        .ant-menu-item:hover,
        .ant-menu-item-active,
        .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
        .ant-menu-submenu-active,
        .ant-menu-submenu-title:hover {
          background-color: @top-menu-active-bg-color;
        }
      }
    }
  }
</style>
