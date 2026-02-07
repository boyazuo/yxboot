<template>
  <div class="page">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="'sysRole:create'" type="primary" @click="handleCreate">新增角色</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
              auth: 'sysRole:edit'
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              danger: true,
              popConfirm: {
                title: `是否删除该条记录？`,
                confirm: handleRemove.bind(null, record)
              },
              auth: 'sysRole:remove'
            }
          ]"
        />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { listRole, removeRole } from '@/api/sys/role'
import { useDrawer } from '@/components/Drawer'
import { useTable } from '@/components/Table'
import RoleDrawer from './RoleDrawer.vue'
import { searchFormSchema, tableColumns } from './role.data'

const [registerTable, { reload: reloadList }] = useTable({
  title: '角色列表',
  api: listRole,
  rowKey: 'roleId',
  columns: tableColumns,
  useSearchForm: true,
  formConfig: {
    labelWidth: 100,
    schemas: searchFormSchema,
  },
})

const [registerDrawer, { openDrawer }] = useDrawer()

const handleCreate = () => {
  openDrawer(true, { isUpdate: false })
}

const handleEdit = (record: Recordable) => {
  openDrawer(true, { record, isUpdate: true })
}

const handleRemove = ({ roleId }) => {
  removeRole({ roleId }).then((res) => {
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
