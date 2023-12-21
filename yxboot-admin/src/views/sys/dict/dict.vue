<template>
  <div class="page">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="'sysDict:create'" type="primary" @click="handleCreate">新增字典</a-button>
      </template>
      <template #dictCode="{ record }">
        <span style="color: #1890ff; cursor: pointer" @click="handleDictData(record)">{{ record.dictCode }}</span>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:read-outlined',
              tooltip: '字典数据',
              auth: 'sysDict:dictData',
              onClick: handleDictData.bind(null, record)
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              auth: 'sysDict:edit',
              onClick: handleEdit.bind(null, record)
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              auth: 'sysDict:remove',
              danger: true,
              popConfirm: {
                title: '是否删除该字典？',
                confirm: handleRemove.bind(null, record)
              }
            }
          ]"
        />
      </template>
    </BasicTable>
    <DictDrawer @register="dictDrawer" @success="handleSuccess" />
    <DictDataDrawer @register="dictDataDrawer" />
  </div>
</template>
<script lang="ts" setup>
  import { listDict, removeDict } from '@/api/sys/dict'
  import { useDrawer } from '@/components/Drawer'
  import { useTable } from '@/components/Table'
  import { message } from 'ant-design-vue'
  import DictDataDrawer from './DictData.vue'
  import DictDrawer from './DictDrawer.vue'
  import { searchFormSchema, tableColumns } from './dict.data'

  const [registerTable, { reload: reloadList }] = useTable({
    title: '字典列表',
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema
    },
    useSearchForm: true,
    api: listDict,
    rowKey: 'dictId',
    columns: tableColumns,
    actionColumn: {
      width: 180
    }
  })

  const [dictDrawer, { openDrawer: openDictDrawer }] = useDrawer()
  const [dictDataDrawer, { openDrawer: openDictDataDrawer }] = useDrawer()

  const handleCreate = () => {
    openDictDrawer(true, { isUpdate: false })
  }

  const handleDictData = (record: Recordable) => {
    openDictDataDrawer(true, { record })
  }

  const handleEdit = (record: Recordable) => {
    openDictDrawer(true, { record, isUpdate: true })
  }

  const handleRemove = ({ dictId }) => {
    removeDict({ dictId }).then((res) => {
      if (res.code === 0) {
        message.success('删除成功！')
        reloadList()
      }
    })
  }

  const handleSuccess = () => {
    reloadList()
  }
</script>
