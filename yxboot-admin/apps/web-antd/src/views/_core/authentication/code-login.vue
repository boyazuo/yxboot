<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Form, FormItem, Button, Input } from 'ant-design-vue';

const router = useRouter();
const loading = ref(false);
const form = reactive({
  phoneNumber: '',
  code: '',
});

function handleLogin() {
  loading.value = true;
  // TODO: 调用手机验证码登录接口
  setTimeout(() => {
    loading.value = false;
    router.push('/');
  }, 500);
}

function sendCode() {
  if (!/^\d{11}$/.test(form.phoneNumber)) {
    return;
  }
  // TODO: 调用发送验证码接口
}
</script>

<template>
  <Form layout="vertical">
    <FormItem label="手机号" required>
      <Input
        v-model:value="form.phoneNumber"
        placeholder="请输入11位手机号"
        size="large"
        maxlength="11"
        allow-clear
      />
    </FormItem>
    <FormItem label="验证码" required>
      <div class="flex gap-2">
        <Input
          v-model:value="form.code"
          placeholder="请输入6位验证码"
          size="large"
          maxlength="6"
          allow-clear
        />
        <Button size="large" @click="sendCode">获取验证码</Button>
      </div>
    </FormItem>
    <FormItem>
      <Button
        type="primary"
        size="large"
        block
        :loading="loading"
        @click="handleLogin"
      >
        登录
      </Button>
    </FormItem>
    <div class="text-center text-sm text-muted-foreground">
      <router-link to="/auth/login" class="text-primary hover:underline">账号密码登录</router-link>
    </div>
  </Form>
</template>
