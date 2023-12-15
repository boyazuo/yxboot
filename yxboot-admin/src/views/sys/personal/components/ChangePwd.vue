<template>
  <div class="page">
    <a-card title="修改密码">
      <BasicForm @register="registerForm" @submit="handleSubmit" class="form" />
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { changePassword } from '@/api/sys/user'
  import { useForm } from '@/components/Form'
  import { commonRules, required } from '@/utils/formRules'
  import { message } from 'ant-design-vue'

  const [registerForm, { validate }] = useForm({
    schemas: [
      {
        field: 'oldPassword',
        label: '旧密码',
        component: 'InputPassword',
        rules: [required('请输入旧密码')]
      },
      {
        field: 'password',
        label: '新密码',
        component: 'InputPassword',
        rules: [required('请输入新密码'), ...commonRules.code6]
      },
      {
        field: 'confirmPassword',
        label: '确认密码',
        component: 'InputPassword',
        rules: [required('请输入确认密码')]
      }
    ],
    submitButtonOptions: { text: '修改' }
  })

  const handleSubmit = async () => {
    const values = await validate()
    const { oldPassword, password, confirmPassword } = values
    if (password === confirmPassword)
      changePassword({ oldPassword, password }).then((res) => {
        if (res.code === 0) message.success('修改成功!')
      })
    else message.warning('两次密码输入不一致！')
  }
</script>

<style lang="less" scoped>
  .form {
    width: 500px;
    margin: 0 auto;
  }
</style>
