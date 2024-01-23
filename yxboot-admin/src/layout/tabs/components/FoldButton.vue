<template>
  <span :class="`${prefixCls}__extra-fold`" @click="handleFold">
    <Icon :icon="getIcon" />
  </span>
</template>
<script setup lang="ts">
  import { useHeaderSetting, useSiderSetting } from '@/hooks/setting'
  import { triggerWindowResize } from '@/utils/event'

  const prefixCls = 'tabs-content'
  const { getShowSider, setSiderSetting } = useSiderSetting()
  const { getShowHeader, setHeaderSetting } = useHeaderSetting()

  const getIsUnFold = computed(() => !unref(getShowSider) && !unref(getShowHeader))

  const getIcon = computed(() => (unref(getIsUnFold) ? 'codicon:screen-normal' : 'codicon:screen-full'))

  function handleFold() {
    const isUnFold = unref(getIsUnFold)
    // console.log('handleFold...', isUnFold)
    setSiderSetting({
      show: isUnFold
    })
    setHeaderSetting({ show: isUnFold })
    triggerWindowResize()
  }
</script>
