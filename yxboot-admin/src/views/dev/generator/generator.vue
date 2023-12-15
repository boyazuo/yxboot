<template>
  <div class="page">
    <BasicTable @register="registerTable" :row-selection="rowSelection">
      <template #toolbar>
        <a-button class="mr-2" v-auth="'generator:config'" type="primary" @click="handleTemplate">模板配置</a-button>
        <a-button type="primary" v-auth="'generator:batch'" @click="handleCreate">批量生成</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:read-outlined',
              tooltip: '预览',
              onClick: handleCodePreview.bind(null, record.tableName),
              auth: 'generator:preview'
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '生成代码',
              onClick: handleCodeGenerate.bind(null, record),
              auth: 'generator:code'
            }
          ]"
        />
      </template>
    </BasicTable>
    <GeneratorDrawer @register="generatorDrawer" @success="handleSuccess" />
    <GeneratorTemplateDrawer @register="generatorTemplateDrawer" @success="handleSuccess" />
    <GeneratorPreviewDrawer @register="generatorPreviewDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { listGenerator } from '@/api/dev/generator'
  import { useDrawer } from '@/components/Drawer'
  import { useTable } from '@/components/Table'
  import type { TableProps } from 'ant-design-vue'
  import { message } from 'ant-design-vue'
  import GeneratorDrawer from './GeneratorDrawer.vue'
  import GeneratorPreviewDrawer from './GeneratorPreviewDrawer.vue'
  import GeneratorTemplateDrawer from './GeneratorTemplateDrawer.vue'
  import { searchFormSchema, tableColumns } from './generator.data'

  const [registerTable, { reload: reloadList }] = useTable({
    title: '代码生成',
    titleHelpMessage: '代码生成列表',
    api: listGenerator,
    rowKey: 'tableName',
    columns: tableColumns,
    useSearchForm: true,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema
    }
  })

  const [generatorDrawer, { openDrawer: openGeneratorDrawer }] = useDrawer()
  const [generatorTemplateDrawer, { openDrawer: openGeneratorTemplateDrawer }] = useDrawer()
  const [generatorPreviewDrawer, { openDrawer: openGeneratorPreviewDrawer }] = useDrawer()

  const handleTemplate = () => {
    openGeneratorTemplateDrawer(true, {})
  }

  const handleCreate = () => {
    if (rowArr.value.length !== 0) {
      openGeneratorDrawer(true, { record: { tableName: rowArr }, isUpdate: false })
    } else {
      message.warning('请至少选择一项')
    }
  }

  const handleCodeGenerate = (record: any) => {
    openGeneratorDrawer(true, { record, isUpdate: true })
  }

  const handleCodePreview = (record: any) => {
    openGeneratorPreviewDrawer(true, { record })
  }

  const handleSuccess = () => {
    reloadList()
  }

  const rowArr: any = ref([])
  const rowSelection: TableProps['rowSelection'] = {
    onChange: (selectedRows) => {
      rowArr.value = selectedRows.map((item: any) => {
        return item
      })
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }
</script>
