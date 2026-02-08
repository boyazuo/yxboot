<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Form, FormItem, Input, Button } from 'ant-design-vue';
import { message } from 'ant-design-vue';

const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});
const loading = ref(false);

function handleSubmit() {
  if (form.newPassword !== form.confirmPassword) {
    message.error('两次输入的密码不一致');
    return;
  }
  loading.value = true;
  // TODO: 调用修改密码接口
  setTimeout(() => {
    loading.value = false;
    message.success('密码修改成功');
    form.oldPassword = '';
    form.newPassword = '';
    form.confirmPassword = '';
  }, 500);
}
</script>

<template>
  <div>
    <h3 class="mb-4 text-base font-medium text-foreground">修改密码</h3>
    <Form layout="vertical" class="max-w-md">
      <FormItem label="旧密码" required>
        <Input.Password
          v-model:value="form.oldPassword"
          placeholder="请输入旧密码"
          allow-clear
        />
      </FormItem>
      <FormItem label="新密码" required>
        <Input.Password
          v-model:value="form.newPassword"
          placeholder="请输入新密码"
          allow-clear
        />
      </FormItem>
      <FormItem label="确认密码" required>
        <Input.Password
          v-model:value="form.confirmPassword"
          placeholder="请再次输入新密码"
          allow-clear
        />
      </FormItem>
      <FormItem>
        <Button type="primary" :loading="loading" @click="handleSubmit">
          保存
        </Button>
      </FormItem>
    </Form>
  </div>
</template>
