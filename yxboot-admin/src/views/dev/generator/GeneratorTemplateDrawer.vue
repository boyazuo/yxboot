<template>
  <BasicDrawer width="1200" :title="getTitle" @register="register" @ok="handleSubmit">
    <a-tabs v-model:activeKey="tabActive" animated @change="handleChange">
      <a-tab-pane v-for="(item, index) in tabPane" :key="index" :tab="item.label" />
    </a-tabs>
    <TemplateCode ref="tabRef" @success="handleTabChange" />
  </BasicDrawer>
</template>

<script lang="ts" setup>
  import { checkGeneratorTemplate, saveGeneratorTemplate } from '@/api/dev/generator'
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer'
  import { message } from 'ant-design-vue'
  import TemplateCode from './components/templateCode.vue'

  const tabRef = ref()
  const tabActive = ref(0)
  const tabLeftActive = ref(0)
  const dataSource = ref([]) as any
  const tabPane = ref([{ label: '前端模板配置' }, { label: '后端模板配置' }])

  const getTitle = computed(() => '模板配置')

  const [register, { closeDrawer }] = useDrawerInner(async () => {
    tabRef.value.loadPreviewCode(tabActive.value)
  })

  const handleChange = (record) => {
    tabActive.value = record
    tabRef.value.loadPreviewCode(tabActive.value)
  }

  const handleTabChange = (record, data) => {
    tabLeftActive.value = record
    dataSource.value = data
  }

  const handleSubmit = async () => {
    try {
      const values = dataSource.value[tabLeftActive.value]
      const content = values.content
      checkGeneratorTemplate({ content }).then((res) => {
        if (res.code === 0) {
          saveTemplateCodeChange(values)
        }
      })
    } catch (error) {
      console.error('validate failed!', error)
    }
  }

  const saveTemplateCodeChange = async (values) => {
    try {
      saveGeneratorTemplate(values).then((res) => {
        message.success(res.msg)
        closeDrawer()
      })
    } catch (error) {
      console.error('validate failed!', error)
    }
  }
</script>
