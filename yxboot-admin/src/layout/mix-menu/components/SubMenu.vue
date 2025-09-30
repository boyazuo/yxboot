<template>
  <a-menu-item :key="menu.path">
    <!-- <component :is="menu.icon" v-if="menu.icon" /> -->
    <template #icon v-if="menu.icon">
      <Icon :icon="menu.icon" size="18" />
    </template>
    <span>{{ menu.name }}</span>
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
      },
    },
  },
}
</script>
<style lang="less" scoped></style>
