<template>
  <a-menu-item :class="getWrapperClass" @click="handleMenuClick" :key="menuKey">
    <!-- <component :is="menu.icon" v-if="menu.icon" /> -->
    <template #icon v-if="menu.icon">
      <Icon :icon="menu.icon" size="22" />
    </template>
    <span>{{ parseMenu.name }}</span>
  </a-menu-item>
</template>
<script lang="ts" setup>
  import Icon from '@/components/Icon'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  const props = defineProps({
    menu: {
      type: Object,
      default() {
        return {}
      }
    }
  })

  const emit = defineEmits(['openSubMenus'])

  const isGroupMenu = computed(() => {
    if (!props.menu.children || props.menu.children.length === 0) {
      return false
    }
    if (props.menu.children && props.menu.children.length === 1) {
      const [child] = props.menu.children
      return child.name !== props.menu.name
    }
    return true
  })

  const parseMenu = computed(() => {
    const menu = props.menu
    return isGroupMenu ? menu : menu.children && menu.children.length === 1 ? menu.children[0] : menu
  })

  const menuKey = computed(() => {
    return unref(isGroupMenu) ? `menu_${unref(parseMenu).menuId}` : unref(parseMenu).path
  })

  const getWrapperClass = computed(() => {
    const { isMixTopType, isMixSidebarType } = useMenuSetting()

    return {
      'mix-sider': unref(isMixSidebarType),
      'mix-top': unref(isMixTopType)
    }
  })

  function handleMenuClick() {
    console.log('parseMenu==', unref(parseMenu))
    if (unref(parseMenu).children && unref(parseMenu).children.length > 0) {
      emit('openSubMenus', unref(parseMenu).children)
    }
  }
</script>
<style lang="less" scoped>
  .ant-menu-item {
    &.mix-sider {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      line-height: 60px;
      height: 60px;
    }

    .ant-menu-title-content {
      opacity: 1;
      display: block;
      line-height: 1.5;
      margin-left: 0;
    }
  }
</style>
