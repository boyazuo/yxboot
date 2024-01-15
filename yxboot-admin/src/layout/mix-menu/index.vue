<template>
  <a-menu
    class="yxboot-mix-menus"
    v-if="menus.length > 0"
    v-model:selectedKeys="selectedKeys"
    :theme="menuTheme"
    :mode="menuModel"
    @click="handleMenuClick"
    :inline-collapsed="false"
  >
    <template :key="`menu_${menu.menuId}`" v-for="menu in menus">
      <!--      <MenuGroup v-if="isGroupMenu(menu)" :key="`menu_${menu.path}`" :menu="menu" />-->
      <Menu :menu="menu" @open-sub-menus="handleOpenSubMenus" />
    </template>
  </a-menu>

  <a-layout-sider
    :class="openMenusClass"
    :theme="getSiderTheme"
    v-click-outside="closeSubMenusSider"
    v-bind="getMenuEvents"
  >
    <div class="title">{{ title }}</div>
    <SubMenus :menus="subMenus" @menu-click="closeSubMenusSider" />
  </a-layout-sider>
</template>
<script lang="ts" setup>
  import { useGlobSetting } from '@/hooks/setting/index'
  import { useSiderSetting } from '@/hooks/setting/useSiderSetting'
  import { usePermissionStoreWithOut } from '@/store/modules/permission'
  import { propTypes } from '@/utils/propTypes'
  import { RouteRecord, useRoute, useRouter } from 'vue-router'
  import Menu from './components/Menu.vue'
  import SubMenus from './components/SubMenus.vue'

  const { title } = useGlobSetting()

  const props = defineProps({
    mode: propTypes.oneOf(['vertical', 'horizontal', 'inline']),
    theme: propTypes.oneOf(['light', 'dark'])
  })

  const { getShowSider, getSiderTheme } = useSiderSetting()

  //菜单模式
  const menuModel = computed(() => props.mode || (unref(getShowSider) ? 'inline' : 'horizontal'))

  console.log('menuModel', menuModel.value)

  const menuTheme = computed(() => props.theme || unref(getSiderTheme))

  const router = useRouter()

  const selectedKeys = ref<string[]>([])

  const permission = usePermissionStoreWithOut()
  const menus = permission.getMenus

  const handleMenuClick = function ({ key }: { key: string }) {
    selectedKeys.value.splice(0, selectedKeys.value.length, key)
    if (/http(s)?:/.test(key)) {
      window.open(key)
      openSubMenu.value = false
    } else if (key.indexOf('menu_') === -1) {
      router.push(key)
      openSubMenu.value = false
    }
  }

  const openSubMenu = ref(false)
  const subMenus = ref([])

  const openMenusClass = computed(() => {
    return [
      'open-menus',
      {
        open: unref(openSubMenu)
      }
    ]
  })
  const handleOpenSubMenus = (menus: any) => {
    subMenus.value = menus
    openSubMenu.value = true
  }

  const getMenuEvents = computed(() => {
    return {
      onMouseleave: () => {
        openSubMenu.value = false
      }
    }
  })

  const closeSubMenusSider = () => {
    openSubMenu.value = false
  }

  const checkMenuSelect = (route) => {
    const resolve = router.resolve(route)
    const { matched } = resolve
    console.log('matched route==========', matched)
    const [first] = matched as unknown as RouteRecord[]
    if (first.children && first.children.length > 1) {
      selectedKeys.value.splice(0, selectedKeys.value.length, `menu_${first.meta?.menuId}`)
    } else {
      selectedKeys.value.splice(0, selectedKeys.value.length, route.fullPath)
    }
  }

  onMounted(async () => {
    const route = useRoute()
    checkMenuSelect(route)
    watch(
      () => route.fullPath,
      () => checkMenuSelect(route)
    )
  })
</script>
<style lang="less" scope>
  .yxboot-mix-menus {
    height: calc(100% - 48px) !important;
    overflow: auto;
    position: relative;
    z-index: 1111;

    &.ant-menu-dark {
      &.ant-menu-vertical {
        border-right: 1px solid var(--sider-dark-lighten-bg-color);
      }
    }

    &.ant-layout-sider-light {
      border-right: 1px solid #f0f0f0;
    }

    .ant-menu-item,
    .ant-menu-submenu,
    .ant-menu-submenu-title {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      // width: 100%;
      line-height: 60px !important;
      height: 60px !important;
    }

    .ant-menu-title-content {
      opacity: 1 !important;
      display: block !important;
      line-height: 1.5 !important;
      margin-left: 0 !important;
    }
  }

  .open-menus {
    position: absolute !important;
    top: 0;
    right: 100px;
    height: 100%;
    z-index: 12;
    transition: right 300ms ease-out;

    &.open {
      left: 80px;
    }

    &.ant-layout-sider-light {
      .title {
        border-bottom: 1px solid #f0f0f0;
        border-right: 1px solid #f0f0f0;
      }
    }

    .title {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
      margin-left: 0;
      padding-left: 8px;
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid var(--sider-dark-lighten-bg-color);
      border-right: 1px solid var(--sider-dark-lighten-bg-color);
    }
  }
</style>
