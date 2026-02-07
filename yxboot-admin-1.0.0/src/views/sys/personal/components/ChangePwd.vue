<template>
  <div class="page">
    <a-card title="修改密码">
      <BasicForm @register="registerForm" @submit="handleSubmit" class="form" />
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { changePassword } from '@/api/sys/user'
import { useForm } from '@/components/Form'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const [registerForm, { validate }] = useForm({
  schemas: [
    // 隐藏一个用户名字段，为使用辅助技术的用户提供更好的体验
    {
      field: 'username',
      label: '用户名',
      component: 'Input',
      defaultValue: userStore.user?.username,
      // 这样的设置告诉浏览器这是用于输入用户名的字段，并可能触发浏览器的自动填充功能。
      componentProps: { autocomplete: 'username' },
      show: false,
    },
    {
      field: 'oldPassword',
      label: '旧密码',
      component: 'InputPassword',
      required: true,
      // 为 input 元素添加 autocomplete 属性，并将其设置为 "current-password"。
      // 这样的设置告诉浏览器这是一个用于输入当前密码的字段，并且可能触发浏览器的密码管理工具。
      componentProps: { autocomplete: 'current-password' },
    },
    {
      field: 'password',
      label: '新密码',
      component: 'InputPassword',
      required: true,
      rules: [{ min: 6, max: 20, message: '密码长度为6-20位' }],
      componentProps: { autocomplete: 'current-password' },
    },
    {
      field: 'confirmPassword',
      label: '确认密码',
      component: 'InputPassword',
      required: true,
      componentProps: { autocomplete: 'current-password' },
    },
  ],
  submitButtonOptions: { text: '修改' },
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
