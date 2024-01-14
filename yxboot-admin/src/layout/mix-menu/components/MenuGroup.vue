<template>
  <a-sub-menu :key="`${parent.menuId ? parent.menuId + '_' : ''}${menu.menuId}`">
    <template #icon v-if="menu.icon">
      <Icon :icon="menu.icon" size="18" />
    </template>
    <template #title>
      <span>
        <component :is="menu.icon" v-if="menu.icon" />
        <span>{{ menu.name }}</span>
      </span>
    </template>
    <template v-for="item in children">
      <menu-group
        :parent="menu"
        :menu="item"
        :key="`${fullPrefix}${item.path}`"
        v-if="item.children && item.children.length > 0"
      />
      <Menu :menu="item" :key="`${fullPrefix}${item.path}`" v-else />
    </template>
  </a-sub-menu>
</template>
<script>
  import Icon from '@/components/Icon'
  import Menu from './Menu.vue'
  export default {
    name: 'MenuGroup',
    components: { Menu, Icon },
    props: {
      parent: {
        type: Object,
        default() {
          return {}
        }
      },
      menu: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      fullPrefix() {
        const { parent, menu } = this
        if (parent.path) {
          return `menu_${parent.path || ''}_${menu.path}_`
        }
        return `menu_${menu.path}_`
      },
      hasChildren() {
        const { children } = this
        return children.length > 0
      },
      children() {
        const { menu } = this
        return menu.children ? menu.children : []
      }
    }
  }
</script>
<style lang="less" scoped></style>
