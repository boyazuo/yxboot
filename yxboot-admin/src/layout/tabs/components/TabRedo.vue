<template>
  <span :class="`${prefixCls}__extra-redo`" @click="handleRedo">
    <RedoOutlined :spin="loading" />
  </span>
</template>
<script setup lang="ts">
  import { useTabs } from '@/hooks/web/useTabs'
  import { RedoOutlined } from '@ant-design/icons-vue'

  const loading = ref(false)

  const prefixCls = 'tabs-content'
  const { refreshPage } = useTabs()

  async function handleRedo() {
    loading.value = true
    await refreshPage()
    setTimeout(() => {
      loading.value = false
      // Animation execution time
    }, 1200)
  }
</script>
