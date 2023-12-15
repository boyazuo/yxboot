<template>
  <BasicDrawer :title="getTitle" @register="register" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>

<script lang="ts" setup>
  import { saveUser } from '@/api/sys/user'
  import { useDrawerInner } from '@/components/Drawer'
  import { useForm } from '@/components/Form'
  import { message } from 'ant-design-vue'
  import { editFormSchema } from './user.data'

  const emit = defineEmits(['success'])

  const isUpdate = ref(true)

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: editFormSchema,
    showActionButtonGroup: false,
    labelWidth: 150
  })

  const [register, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields()
    setDrawerProps({ confirmLoading: false })
    isUpdate.value = !!data?.isUpdate
    if (unref(isUpdate)) setFieldsValue({ ...data.record })
  })

  const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'))

  const handleSubmit = async () => {
    try {
      const values = await validate()
      saveUser(values).then((res) => {
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
