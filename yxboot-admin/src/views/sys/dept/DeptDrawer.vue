<template>
  <BasicDrawer :title="getTitle" @register="register" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #parentId="{ model }">
        <a-cascader
          v-model:value="model.parentId"
          :options="treeData"
          :fieldNames="fieldNames"
          changeOnSelect
          placeholder="请选择上级部门"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { saveDept, treeDept } from '@/api/sys/dept'
  import { useDrawerInner } from '@/components/Drawer'
  import { useForm } from '@/components/Form'
  import { message } from 'ant-design-vue'
  import { editFormSchema } from './dept.data'

  const emit = defineEmits(['success', 'register'])

  const isUpdate = ref(true)
  const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'))

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: editFormSchema,
    showActionButtonGroup: false
  })

  const [register, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields()
    await loadTreeDate()
    setDrawerProps({ confirmLoading: false })
    isUpdate.value = !!data?.isUpdate
    const { deptId, parentId } = data.record
    const parentNode =
      handleFindTreeValue(
        treeData.value,
        (node) => node.deptId === (deptId ? deptId : parentId),
        (node) => {
          if (deptId) {
            node.disabled = true
            node.children = []
          }
        }
      ) ?? []
    if (deptId) parentNode.pop()
    const parentIdArr = parentNode.map((item) => item.deptId)
    if (unref(isUpdate)) setFieldsValue({ ...data.record, parentId: parentIdArr })
  })

  const handleSubmit = async () => {
    try {
      const values = await validate()
      const { parentId } = values
      const params = { ...values }
      if (parentId) params.parentId = parentId.at(-1)
      saveDept(params).then((res) => {
        if (res.code === 0) {
          emit('success')
          message.success(res.msg)
          closeDrawer()
        } else {
          message.error(res.msg)
        }
      })
    } catch (error) {
      console.error('validate failed!', error)
    }
  }

  const treeData = ref()
  const fieldNames = { label: 'name', value: 'deptId' }
  const loadTreeDate = async () => {
    await treeDept({}).then((res) => {
      treeData.value = res.data
    })
  }

  const handleFindTreeValue = (tree, func, func2, parentNode: any[] = []) => {
    for (const node of tree) {
      if (func(node)) {
        func2(node)
        return [...parentNode, node]
      }
      if (node.children) {
        const res = handleFindTreeValue(node.children, func, func2, [...parentNode, node])
        if (res) return res
      }
    }
    return null
  }
</script>
<style></style>
