<template>
  <div :class="[prefixCls, theme]" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="getCollapsed" /> <MenuFoldOutlined v-else />
  </div>
</template>

<script lang="ts" setup>
  import { useSiderSetting } from '@/hooks/setting'
  import { propTypes } from '@/utils/propTypes'
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

  defineProps({
    theme: propTypes.oneOf(['light', 'dark'])
  })
  const { getCollapsed, toggleCollapsed } = useSiderSetting()
  const prefixCls = 'layout-header-trigger'
</script>
