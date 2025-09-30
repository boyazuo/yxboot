<template>
  <BasicDrawer :title="getTitle" @register="register" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { saveMenu } from '@/api/sys/menu'
import { useDrawerInner } from '@/components/Drawer'
import { useForm } from '@/components/Form'
import { editFormSchema } from './menu.data'

const emit = defineEmits(['success', 'register'])

const isUpdate = ref(true)

const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
  schemas: editFormSchema,
  showActionButtonGroup: false,
})

const [register, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
  await resetFields()
  setDrawerProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate
  if (unref(isUpdate)) setFieldsValue({ ...data.record })
})

const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'))

const handleSubmit = async () => {
  try {
    const values = await validate()
    saveMenu(values).then((res) => {
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
</script>
