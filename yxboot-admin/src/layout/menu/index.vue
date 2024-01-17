<template>
  <a-menu
    class="yxboot-menus"
    v-if="menus.length > 0"
    v-model:selectedKeys="selectedKeys"
    :openKeys="openKeys"
    :theme="menuTheme"
    :mode="mode"
    @click="handleMenuClick"
    @open-change="handleOpenChange"
  >
    <template v-for="menu in menus">
      <MenuGroup v-if="isGroupMenu(menu)" :key="`menu_${menu.path}`" :menu="menu" />
      <Menu v-else :key="`menu_${parseMenu(menu).path}`" :menu="parseMenu(menu)" />
    </template>
    <!-- <template v-for="menu in menus">
      <MenuGroup v-if="menu.children && menu.children.length > 0" :key="`menu_${menu.path}`" :menu="menu" />
      <Menu v-else :key="`menu_${menu.path}`" :menu="menu" />
    </template> -->
  </a-menu>
</template>
<script lang="ts" setup>
  import { SysMenu } from '@/api/model/sysModel'
  import { MenuModeEnum } from '@/enums/menuEnum'
  import { useSiderSetting } from '@/hooks/setting'
  import { usePermissionStoreWithOut } from '@/store/modules/permission'
  import { propTypes } from '@/utils/propTypes'
  import { useRoute, useRouter } from 'vue-router'
  import Menu from './components/Menu.vue'
  import MenuGroup from './components/MenuGroup.vue'

  const props = defineProps({
    theme: propTypes.oneOf(['light', 'dark']),
    // 菜单模式
    mode: propTypes.oneOf([MenuModeEnum.INLINE, MenuModeEnum.HORIZONTAL]).def(MenuModeEnum.INLINE)
  })

  const { getShowSider, getCollapsed, getSiderTheme } = useSiderSetting()

  const menuTheme = computed(() => props.theme || unref(getSiderTheme))

  const router = useRouter()

  const selectedKeys = ref<string[]>([])
  const openKeys = ref<string[]>([])

  const permission = usePermissionStoreWithOut()
  const menus = permission.getMenus

  const handleMenuClick = function ({ key }: { key: string }) {
    selectedKeys.value.splice(0, selectedKeys.value.length, key)
    if (/http(s)?:/.test(key)) {
      window.open(key)
    } else {
      router.push(key)
    }
  }
  const handleOpenChange = (val: any) => {
    if (unref(getShow) && !unref(getCollapsed)) {
      const latestOpenKey: string = val[val.length - 1] || ''
      if (latestOpenKey.indexOf('_') > -1) {
        const [parent] = latestOpenKey.split('_')
        openKeys.value.splice(0, openKeys.value.length, ...[parent, latestOpenKey])
      } else {
        openKeys.value.splice(0, openKeys.value.length, latestOpenKey)
      }
    }
  }

  const isGroupMenu = function (menu: SysMenu) {
    if (!menu.children || menu.children.length === 0) {
      return false
    }
    if (menu.children && menu.children.length === 1) {
      const [child] = menu.children
      return child.name !== menu.name
    }
    return true
  }

  const parseMenu = function (menu: SysMenu) {
    return menu.children && menu.children.length > 0 ? menu.children[0] : menu
  }

  onMounted(async () => {
    const route = useRoute()
    selectedKeys.value.splice(0, selectedKeys.value.length, route.fullPath)
    const resolve = router.resolve(route)
    const { matched } = resolve
    if (matched.length && unref(getShowSider) && !unref(getCollapsed)) {
      openKeys.value.splice(0, openKeys.value.length)
      matched.forEach((o) => {
        if (o.meta.menuId) {
          const parents = openKeys.value.join('_')
          if (parents) {
            openKeys.value.push(`${parents}_${o.meta.menuId}`)
          } else {
            openKeys.value.push(`${o.meta.menuId}`)
          }
        }
      })
    }
    watch(
      () => route.fullPath,
      () => {
        selectedKeys.value.splice(0, selectedKeys.value.length, route.fullPath)
      }
    )
  })
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
