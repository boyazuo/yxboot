<template>
  <a-menu-item class="mix-menu" @click="handleMenuClick" :key="menuKey">
    <!-- <component :is="menu.icon" v-if="menu.icon" /> -->
    <template #icon v-if="menu.icon">
      <Icon :icon="menu.icon" size="22" />
    </template>
    <span>{{ parseMenu.name }}</span>
  </a-menu-item>
</template>
<script lang="ts">
  import Icon from '@/components/Icon'

  export default {
    name: 'Menu',
    components: { Icon },
    props: {
      menu: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    emits: ['openSubMenus'],
    computed: {
      isGroupMenu(): boolean {
        const { menu = {} } = this
        if (!menu.children || menu.children.length === 0) {
          return false
        }
        if (menu.children && menu.children.length === 1) {
          const [child] = menu.children
          console.log('22222222222222222222222222', menu.name, child)
          console.log('22222222222222222222222222', child.name !== menu.name)
          return child.name !== menu.name
        }
        return true
      },
      parseMenu(): any {
        const { isGroupMenu, menu = {} } = this
        return isGroupMenu ? menu : menu.children && menu.children.length === 1 ? menu.children[0] : menu
      },
      menuKey() {
        const { parseMenu = {}, isGroupMenu } = this
        return unref(isGroupMenu) ? `menu_${unref(parseMenu).menuId}` : unref(parseMenu).path
      }
    },
    methods: {
      handleMenuClick() {
        const { parseMenu = {} } = this
        console.log('parseMenu==', unref(parseMenu))
        if (unref(parseMenu).children && unref(parseMenu).children.length > 0) {
          this.$emit('openSubMenus', unref(parseMenu).children)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .ant-menu-item {
    &.mix-menu {
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
