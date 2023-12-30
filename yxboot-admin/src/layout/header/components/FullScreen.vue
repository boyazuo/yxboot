<template>
  <div @click="toggle">
    <Tooltip :title="getTitle" placement="bottom" :mouseEnterDelay="0.5">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </Tooltip>
  </div>
</template>
<script lang="ts" setup>
  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
  import { useFullscreen } from '@vueuse/core'
  import { Tooltip } from 'ant-design-vue'
  import { computed, unref } from 'vue'

  defineOptions({ name: 'FullScreen' })

  const { toggle, isFullscreen } = useFullscreen()

  const getTitle = computed(() => {
    return unref(isFullscreen) ? '退出全屏' : '全屏'
  })
</script>
