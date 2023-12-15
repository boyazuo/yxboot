<template>
  <span :class="`${prefixCls}__extra-redo`" @click="handleRedo">
    <RedoOutlined :spin="loading" />
  </span>
</template>
<script lang="ts">
  import { useTabs } from '@/hooks/web/useTabs'
  import { RedoOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'TabRedo',
    components: { RedoOutlined },

    setup() {
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
      return { prefixCls, handleRedo, loading }
    }
  })
</script>
