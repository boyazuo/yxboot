<template>
  <a-menu
    class="sub-menus"
    v-if="menus.length > 0"
    v-model:selectedKeys="selectedKeys"
    :openKeys="openKeys"
    :theme="menuTheme"
    :mode="menuModel"
    @click="handleMenuClick"
    @open-change="handleOpenChange"
    :inline-collapsed="false"
  >
    <template v-for="menu in menus">
      <MenuGroup v-if="isGroupMenu(menu)" :key="`menu_${menu.path}`" :menu="menu" />
      <SubMenu v-else :key="`menu_${parseMenu(menu).path}`" :menu="parseMenu(menu)" />
    </template>
  </a-menu>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { SysMenu } from '@/api/model/sysModel'
import { useSiderSetting } from '@/hooks/setting'
import { propTypes } from '@/utils/propTypes'
import MenuGroup from './MenuGroup.vue'
import SubMenu from './SubMenu.vue'

const props = defineProps({
  theme: propTypes.oneOf(['light', 'dark']),
  menus: {
    type: Array as PropType<SysMenu[]>,
    default: () => [],
  },
})

const emit = defineEmits(['menu-click'])

const { getShowSider, getSiderTheme } = useSiderSetting()
//菜单模式
const menuModel = computed(() => {
  return unref(getShowSider) ? 'inline' : 'horizontal'
})

const menuTheme = computed(() => props.theme || unref(getSiderTheme))

const router = useRouter()

const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

const handleMenuClick = ({ key }: { key: string }) => {
  selectedKeys.value.splice(0, selectedKeys.value.length, key)
  if (/http(s)?:/.test(key)) {
    window.open(key)
  } else {
    router.push(key)
  }
  emit('menu-click')
}
const handleOpenChange = (val: any) => {
  openKeys.value.splice(0, openKeys.value.length, ...val)
  const latestOpenKey = val[val.length - 1]
  if (latestOpenKey.indexOf('_') > -1) {
    const list = latestOpenKey.split('_').reduce((current: any, next: any) => {
      const parent = current[current.length - 1] || ''
      if (parent) {
        current.push(`${parent}_${next}`)
      } else {
        current.push(next)
      }
      return current
    }, [])
    openKeys.value.splice(0, openKeys.value.length, ...list)
  } else {
    openKeys.value.splice(0, openKeys.value.length, latestOpenKey)
  }
}

const isGroupMenu = (menu: SysMenu) => {
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

onMounted(async () => {
  const route = useRoute()
  selectedKeys.value.splice(0, selectedKeys.value.length, route.fullPath)
  const resolve = router.resolve(route)
  const { matched } = resolve
  if (matched.length) {
    matched.splice(0, 1)
    openKeys.value.splice(0, openKeys.value.length)
    matched.forEach((o) => {
      if (o.meta.menuId) {
        const length = unref(openKeys).length
        const parents = unref(openKeys)[length - 1]
        if (parents) {
          openKeys.value.push(`${parents}_${o.meta.menuId}`)
        } else {
          openKeys.value.push(`${o.meta.menuId}`)
        }
      }
    })
    console.log('openKeys==========', unref(openKeys))
  }
  watch(
    () => route.fullPath,
    () => {
      selectedKeys.value.splice(0, selectedKeys.value.length, route.fullPath)
    },
  )
})
</script>
<style lang="less" scope>
  .sub-menus {
    height: calc(100% - 48px);
    overflow: auto;

    &::-webkit-scrollbar {
      width: 8px; /* 纵向滚动条 宽度 */
      height: 8px; /* 横向滚动条 高度 */
      background: #fff; /* 整体背景 */
      border-radius: 4px; /* 整体 圆角 */
    }
  }
</style>
