<template>
  <Tooltip placement="top">
    <template #title>
      <span>刷新</span>
    </template>
    <RedoOutlined @click="redo" />
  </Tooltip>
</template>
<script lang="ts">
  import { RedoOutlined } from '@ant-design/icons-vue'
  import { Tooltip } from 'ant-design-vue'
  import { defineComponent } from 'vue'

  import { useTableContext } from '../../hooks/useTableContext'

  export default defineComponent({
    name: 'RedoSetting',
    components: {
      RedoOutlined,
      Tooltip
    },
    setup() {
      const table = useTableContext()

      function redo() {
        table.reload()
      }

      return { redo }
    }
  })
</script>
