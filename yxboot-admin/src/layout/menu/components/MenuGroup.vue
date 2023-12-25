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
<script setup lang="ts">
  import Icon from '@/components/Icon/index'
  import Menu from './Menu.vue'
  const props = defineProps({
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
  })

  const fullPrefix = computed(() => {
    const { parent, menu } = props
    if (parent.path) {
      return `menu_${parent.path || ''}_${menu.path}_`
    }
    return `menu_${menu.path}_`
  })

  // const hasChildren = computed(() => {
  //   return unref(children).length > 0
  // })

  const children = computed(() => {
    const { menu } = props
    return menu.children ? menu.children : []
  })
</script>
<style lang="less" scoped></style>
