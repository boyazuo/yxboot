<template>
  <a-tabs tabPosition="left" type="card" v-model:activeKey="activeKey" @change="handleChange">
    <a-tab-pane v-for="(item, index) in dataSource" :key="index" :tab="item.name">
      <textarea class="editor" v-model="item.content"></textarea>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
  import { listGeneratorTemplate } from '@/api/dev/generator'

  const activeKey = ref(0)
  const dataSource = ref([]) as any

  const emit = defineEmits(['success'])

  const handleChange = (data) => {
    activeKey.value = data
    emit('success', activeKey.value, dataSource.value)
  }

  const loadPreviewCode = async (tabActive: number) => {
    const result = await listGeneratorTemplate({ type: tabActive + 1 })
    dataSource.value = result.data
    emit('success', activeKey.value, dataSource.value)
  }

  defineExpose({ loadPreviewCode })
</script>
<style lang="less" scoped>
  html[data-theme='dark'] {
    .editor {
      background-color: #303133;
      border: 1px solid var(--border-color);
      color: #fff;
    }

    .editor:focus {
      border: 1px solid var(--primary-color);
      outline: none;
    }
  }

  .editor {
    width: 100%;
    height: 600px;
    padding: 10px;
    border: 1px solid #f3f3f3;
  }
</style>
