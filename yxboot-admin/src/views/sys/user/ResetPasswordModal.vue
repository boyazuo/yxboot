<template>
  <BasicModal @register="registerModal" v-bind="$attrs" title="重置密码" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { resetPassword } from '@/api/sys/user'
  import { FormSchema, useForm } from '@/components/Form'
  import { useModalInner } from '@/components/Modal'
  import { message } from 'ant-design-vue'

  const emit = defineEmits(['success'])
  const formRef = ref({})

  const schemas: FormSchema[] = [
    {
      field: 'password',
      component: 'Input',
      label: '重置密码'
    }
  ]

  const [registerForm, { resetFields, validate }] = useForm({
    schemas: schemas,
    showActionButtonGroup: false
  })

  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    await resetFields()
    if (data) {
      formRef.value = { userId: data.userId }
    }
  })

  const handleSubmit = async () => {
    try {
      const values = await validate()
      const params = { ...formRef.value, ...values }
      resetPassword(params).then(() => {
        message.success('重置成功！')
        emit('success')
        closeModal()
      })
    } catch (error) {
      console.error('not passing', error)
    }
  }
</script>
