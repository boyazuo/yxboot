<template>
  <span :class="`${prefixCls}__extra-fold`" @click="handleFold">
    <Icon :icon="getIcon" />
  </span>
</template>
<script setup lang="ts">
  import { useHeaderSetting, useMenuSetting, useSiderSetting } from '@/hooks/setting'
  import { triggerWindowResize } from '@/utils/event'

  const prefixCls = 'tabs-content'
  const { getShowSider } = useSiderSetting()
  const { setMenuSetting } = useMenuSetting()
  const { getShowHeader, setHeaderSetting } = useHeaderSetting()

  const getIsUnFold = computed(() => !unref(getShowSider) && !unref(getShowHeader))

  const getIcon = computed(() => (unref(getIsUnFold) ? 'codicon:screen-normal' : 'codicon:screen-full'))

  function handleFold() {
    const isUnFold = unref(getIsUnFold)
    // console.log('handleFold...', isUnFold)
    setMenuSetting({
      show: isUnFold
    })
    setHeaderSetting({ show: isUnFold })
    triggerWindowResize()
  }
</script>
