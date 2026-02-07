<template>
  <div class="page" ref="search">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="'sysDept:create'" type="primary" @click="handleCreate">新增部门</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:plus-square-outlined',
              tooltip: `新增子部门`,
              onClick: handleCreateChild.bind(null, record),
              auth: 'sysDept:create'
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
              auth: 'sysDept:edit'
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              danger: true,
              popConfirm: {
                title: `是否删除该部门？`,
                confirm: handleRemove.bind(null, record)
              },
              auth: 'sysDept:remove'
            }
          ]"
        />
      </template>
    </BasicTable>
    <DeptDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { removeDept, treeDept } from '@/api/sys/dept'
import { useDrawer } from '@/components/Drawer'
import { useTable } from '@/components/Table'
import DeptDrawer from './DeptDrawer.vue'
import { tableColumns } from './dept.data'

const [registerTable, { reload: reloadList }] = useTable({
  title: `部门列表`,
  api: treeDept,
  rowKey: 'deptId',
  columns: tableColumns,
  useSearchForm: false,
  pagination: false,
  showIndexColumn: false,
  actionColumn: {
    width: 180,
  },
})

const [registerDrawer, { openDrawer }] = useDrawer()

const handleCreate = () => {
  openDrawer(true, { isUpdate: false })
}

const handleEdit = (record: Recordable) => {
  openDrawer(true, { record, isUpdate: true })
}

const handleCreateChild = (record: Recordable) => {
  openDrawer(true, { record: { parentId: record.deptId }, isUpdate: true })
}

const handleRemove = ({ deptId }) => {
  removeDept({ deptId }).then((res) => {
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
