<template>
  <BasicDrawer :title="getTitle" @register="register" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { saveDict } from '@/api/sys/dict'
  import { useDrawerInner } from '@/components/Drawer'
  import { useForm } from '@/components/Form'
  import { message } from 'ant-design-vue'
  import { editFormSchema } from './dict.data'

  const emit = defineEmits(['success', 'register'])

  const isUpdate = ref(true)
  const getTitle = computed(() => (!unref(isUpdate) ? '新增字典' : '编辑字典'))

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: editFormSchema,
    labelWidth: 120,
    showActionButtonGroup: false
  })

  const [register, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields()
    setDrawerProps({ confirmLoading: false })
    isUpdate.value = !!data?.isUpdate
    if (unref(isUpdate)) setFieldsValue({ ...data.record })
  })

  const handleSubmit = async () => {
    try {
      const values = await validate()
      saveDict(values).then((res) => {
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
