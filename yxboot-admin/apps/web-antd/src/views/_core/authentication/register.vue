<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Form, FormItem, Button, Input } from 'ant-design-vue';

const router = useRouter();
const form = reactive({
  username: '',
  password: '',
  confirm: '',
});

function handleSubmit() {
  if (form.password !== form.confirm) {
    return;
  }
  // TODO: 调用注册接口
  router.push('/auth/login');
}
</script>

<template>
  <Form layout="vertical">
    <FormItem label="用户名" required>
      <Input v-model:value="form.username" placeholder="请输入用户名" size="large" />
    </FormItem>
    <FormItem label="密码" required>
      <Input v-model:value="form.password" type="password" placeholder="请输入密码" size="large" />
    </FormItem>
    <FormItem label="确认密码" required>
      <Input v-model:value="form.confirm" type="password" placeholder="请再次输入密码" size="large" />
    </FormItem>
    <FormItem>
      <Button type="primary" size="large" block @click="handleSubmit">注册</Button>
    </FormItem>
    <div class="text-center text-sm text-gray-500">
      <router-link to="/auth/login">已有账号？去登录</router-link>
    </div>
  </Form>
</template>
