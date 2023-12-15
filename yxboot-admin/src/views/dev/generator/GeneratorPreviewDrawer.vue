<template>
  <BasicDrawer width="1200" :title="getTitle" :showFooter="false" @register="register">
    <a-tabs v-model:activeKey="tabActive" animated @change="handleChange">
      <a-tab-pane v-for="(item, index) in tabPane" :key="index" :tab="item.label" />
    </a-tabs>
    <PreviewCode ref="tabRef" />
  </BasicDrawer>
</template>

<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer'
  import PreviewCode from './components/previewCode.vue'

  const tabRef = ref()
  const tabActive = ref(0)
  const tableName = ref('')
  const tabPane = ref([{ label: '前端代码预览' }, { label: '后端代码预览' }])

  const getTitle = computed(() => '预览')

  const [register] = useDrawerInner(async (data) => {
    tableName.value = data?.record
    tabRef.value.loadPreviewCode(tableName.value, tabActive.value)
  })

  const handleChange = (key) => {
    tabActive.value = key
    tabRef.value.loadPreviewCode(tableName.value, tabActive.value)
  }
</script>
