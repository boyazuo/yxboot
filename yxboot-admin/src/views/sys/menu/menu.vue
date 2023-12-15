<template>
  <div class="page">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="'sysMenu:create'" type="primary" @click="handleCreate">新增菜单</a-button>
      </template>
      <template #icon="{ record }">
        <Icon :icon="record.icon" />
      </template>
      <template #path="{ record }">
        {{ record?.path ?? record?.code }}
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:plus-square-outlined',
              tooltip: '新增子菜单',
              // color: judgeMenuType(record)?.isCreateChild ? undefined : 'warning',
              onClick: handleCreateChild.bind(null, record),
              auth: 'sysMenu:create',
              ifShow: !judgeMenuType(record)?.ifShowButton
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              auth: 'sysMenu:edit',
              onClick: handleEdit.bind(null, record)
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              auth: 'sysMenu:remove',
              color: 'error',
              popConfirm: {
                title: '是否删除该菜单？',
                confirm: handleRemove.bind(null, record)
              }
            }
          ]"
        />
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { removeMenu, treeMenu } from '@/api/sys/menu'
  import { useDrawer } from '@/components/Drawer'
  import { useTable } from '@/components/Table'
  import { message } from 'ant-design-vue'
  import MenuDrawer from './MenuDrawer.vue'
  import { listMenuType, tableColumns } from './menu.data'

  const [registerTable, { reload: reloadList }] = useTable({
    title: '菜单列表',
    api: treeMenu,
    rowKey: 'menuId',
    columns: tableColumns,
    useSearchForm: false,
    pagination: false,
    showIndexColumn: false,
    actionColumn: {
      width: 180
    }
  })

  const [registerDrawer, { openDrawer }] = useDrawer()

  const handleCreate = () => {
    openDrawer(true, { isUpdate: false })
  }

  const judgeMenuType = ({ type }) => listMenuType.find((item) => item.value === type) || listMenuType.at(0)

  const handleCreateChild = (record: Recordable) => {
    openDrawer(true, { record: { parentName: record.name, parentId: record.menuId }, isUpdate: true })
  }

  const handleEdit = (record: Recordable) => {
    openDrawer(true, { record, isUpdate: true })
  }

  const handleRemove = ({ menuId }) => {
    removeMenu({ menuId }).then((res) => {
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
