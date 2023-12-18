<template>
  <BasicDrawer :title="getTitle" @register="register" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
    <span>分配权限：</span>
    <BasicTree
      v-model:checkedKeys="checkedKeys"
      :tree-data="treeMenuData"
      :fieldNames="{ title: 'name', key: 'menuId' }"
      checkable
    />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { allMenu, treeMenu } from '@/api/sys/menu'
  import { saveRole } from '@/api/sys/role'
  import { useDrawerInner } from '@/components/Drawer'
  import { useForm } from '@/components/Form'
  import { message } from 'ant-design-vue'
  import { editFormSchema } from './role.data'

  const emit = defineEmits(['success', 'register'])

  const isUpdate = ref(true)
  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'))

  const checkedKeys: any = ref({ checked: [], halfChecked: [] })

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: editFormSchema,
    showActionButtonGroup: false
  })

  const [register, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields()
    await loadTreeMenuData()
    setDrawerProps({ confirmLoading: false })
    isUpdate.value = !!data?.isUpdate
    if (unref(isUpdate)) {
      setFieldsValue({ ...data.record })
      const allMenuData = await loadMenuAllData()
      const roleMenuData = await loadMenuAllData({ roleId: data.record.roleId })
      initCheckedKeys(allMenuData, roleMenuData)
    }
  })

  const handleSubmit = async () => {
    try {
      const values = await validate()

      const { checked, halfChecked } = unref(checkedKeys)
      const menus = [...checked, ...halfChecked].map((item) => ({ menuId: item }))

      const params = { ...values, menus }
      saveRole(params).then((res) => {
        if (res.code === 0) {
          emit('success')
          message.success(res.msg)
          closeDrawer()
        } else {
          message.warning(res.msg)
        }
      })
    } catch (error) {
      console.error('validate failed!', error)
    }
  }

  let treeMenuData = ref([])

  const loadTreeMenuData = async () => {
    if (treeMenuData.value.length) return
    const result = await treeMenu()
    treeMenuData.value = result.data
  }

  const loadMenuAllData = async (params?: { roleId: number }) => {
    const result = await allMenu(params)
    return result.data
  }

  const initCheckedKeys = async (allMenu, roleMenu) => {
    let checked: number[] = []
    let halfChecked: number[] = []

    roleMenu.forEach((rm) => {
      const children = allMenu.filter((item) => item.parentId == rm.menuId)
      if (!children.length) {
        checked.push(rm.menuId)
      } else {
        const unChecks = children.filter((item) => !roleMenu.includes(item))
        if (!unChecks.length) {
          checked.push(rm.menuId)
        } else {
          halfChecked.push(rm.menuId)
        }
      }
    })
    checkedKeys.value = { checked, halfChecked }
  }
</script>
