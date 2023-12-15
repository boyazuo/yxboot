<template>
  <div class="page">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" v-auth="'user:create'" @click="handleCreate">新增用户</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:reload-outlined',
              tooltip: '重置密码',
              onClick: handleResetPassword.bind(null, record),
              auth: 'user:resetPassword'
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
              auth: 'user:edit'
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              color: 'error',
              auth: 'user:remove',
              popConfirm: {
                title: '是否删除该条记录？',
                confirm: handleRemove.bind(null, record)
              }
            }
          ]"
        />
      </template>
    </BasicTable>

    <ResetPasswordModalVue @register="registerModal" />
    <UserDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { listUser, removeUser } from '@/api/sys/user'
  import { useDrawer } from '@/components/Drawer'
  import { useModal } from '@/components/Modal'
  import { useTable } from '@/components/Table'
  import { message } from 'ant-design-vue'
  import ResetPasswordModalVue from './ResetPasswordModal.vue'
  import UserDrawer from './UserDrawer.vue'
  import { searchFormSchema, tableColumns } from './user.data'

  const [registerTable, { reload: reloadList }] = useTable({
    title: '用户列表',
    titleHelpMessage: '用户表提示说明(示例)',
    api: listUser,
    rowKey: 'userId',
    columns: tableColumns,
    useSearchForm: true,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema
    },
    actionColumn: {
      width: 180
    }
  })

  const [registerModal, { openModal }] = useModal()

  const [registerDrawer, { openDrawer }] = useDrawer()

  const handleCreate = () => {
    openDrawer(true, { isUpdate: false })
  }

  const handleEdit = (record: Recordable) => {
    openDrawer(true, { record, isUpdate: true })
  }

  const handleRemove = ({ userId }) => {
    removeUser({ userId }).then((res) => {
      if (res.code === 0) {
        message.success('删除成功！')
        reloadList()
      }
    })
  }

  const handleSuccess = () => {
    reloadList()
  }

  const handleResetPassword = ({ userId }) => {
    openModal(true, {
      userId
    })
  }
</script>
