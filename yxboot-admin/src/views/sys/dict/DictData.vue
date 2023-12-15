<template>
  <BasicDrawer title="字典数据" @register="register" :showFooter="false" width="720">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="'sysDict:createData'" type="primary" @click="handleCreateBatch">批量新增字典数据</a-button>
        <a-button v-auth="'sysDict:createData'" type="primary" @click="handleCreate" style="margin-left: 8px">
          新增字典数据
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              auth: 'sysDict:editData',
              onClick: handleEdit.bind(null, record)
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              auth: 'sysDict:removeData',
              color: 'error',
              popConfirm: {
                title: '是否删除该字典数据？',
                confirm: handleRemove.bind(null, record)
              }
            }
          ]"
        />
      </template>
    </BasicTable>
    <DictDataDrawer @register="dictDataDrawer" @success="handleSuccess" />
    <DictDataBatchDrawer @register="dictDataBatchDrawer" @success="handleSuccess" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { allDictData, removeDictData } from '@/api/sys/dictData'
  import { useDrawer, useDrawerInner } from '@/components/Drawer'
  import { useTable } from '@/components/Table'
  import { message } from 'ant-design-vue'
  import DictDataBatchDrawer from './DictDataBatchDrawer.vue'
  import DictDataDrawer from './DictDataDrawer.vue'
  import { tableColumns_dictData as tableColumns } from './dict.data'

  const dictCode = ref('')
  const [register] = useDrawerInner(async (data) => {
    dataSource.value = []
    dictCode.value = data.record?.dictCode
    reloadList()
  })

  const dataSource = ref([])
  const reloadList = () => {
    allDictData({ dictCode: dictCode.value }).then((res) => {
      dataSource.value = res.data
    })
  }

  const [registerTable] = useTable({
    title: '字典数据列表',
    useSearchForm: false,
    dataSource,
    rowKey: 'id',
    columns: tableColumns
  })

  const [dictDataDrawer, { openDrawer: openDictDataDrawer }] = useDrawer()
  const [dictDataBatchDrawer, { openDrawer: openDictDataBatchDrawer }] = useDrawer()

  const handleCreateBatch = () => {
    openDictDataBatchDrawer(true, { dictCode: dictCode.value, allDictData: dataSource.value })
  }

  const handleCreate = () => {
    openDictDataDrawer(true, { record: { dictCode: dictCode.value }, allDictData: dataSource.value, isUpdate: false })
  }

  const handleEdit = (record: any) => {
    openDictDataDrawer(true, { record, allDictData: dataSource.value, isUpdate: true })
  }

  const handleRemove = ({ id }: { id: number }) => {
    removeDictData({ id }).then((res: any) => {
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
