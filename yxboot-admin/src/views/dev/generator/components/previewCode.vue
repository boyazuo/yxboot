<template>
  <div>
    <a-tabs tabPosition="left" type="card" v-model:activeKey="activeKey">
      <a-tab-pane v-for="(item, index) in dataSource" :key="index" :tab="item.name">
        <textarea class="editor" v-model="item.content" readonly></textarea>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
  import { previewCodeGenerator } from '@/api/dev/generator'

  const activeKey = ref(0)
  const dataSource = ref([]) as any

  const loadPreviewCode = async (table: any, tabActive: number) => {
    const result = await previewCodeGenerator({ table, type: tabActive + 1 })
    dataSource.value = result.data
  }

  defineExpose({ loadPreviewCode })
</script>
<style lang="less" scoped>
  .editor {
    width: 100%;
    height: 600px;
    padding: 10px;
    border: 1px solid #f3f3f3;
  }
</style>
