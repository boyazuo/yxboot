<template>
  <Tooltip placement="top">
    <template #title>
      <span>全屏</span>
    </template>
    <FullscreenOutlined @click="toggle" v-if="!isFullscreen" />
    <FullscreenExitOutlined @click="toggle" v-else />
  </Tooltip>
</template>
<script setup lang="ts">
  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
  import { useFullscreen } from '@vueuse/core'
  import { Tooltip } from 'ant-design-vue'
  import { useTableContext } from '../../hooks/useTableContext'

  const table = useTableContext()
  const { toggle, isFullscreen } = useFullscreen(table.wrapRef)
</script>
