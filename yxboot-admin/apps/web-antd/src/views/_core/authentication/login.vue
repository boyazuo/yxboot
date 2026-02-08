<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { Form, FormItem, Button, Input } from 'ant-design-vue';
import { useAuthStore } from '@/store';
import { getCaptchaApi } from '@/api';

const authStore = useAuthStore();

const form = reactive({
  username: '',
  password: '',
  captchaCode: '',
});

const captchaImage = ref('');
const captchaLoading = ref(false);

async function loadCaptcha() {
  captchaLoading.value = true;
  try {
    const data = await getCaptchaApi();
    // 后端可能返回完整 data URL 或纯 base64，统一成可用的图片地址
    captchaImage.value = data
      ? (typeof data === 'string' && data.startsWith('data:') ? data : `data:image/png;base64,${data}`)
      : '';
    form.captchaCode = '';
  } finally {
    captchaLoading.value = false;
  }
}

onMounted(loadCaptcha);

async function handleSubmit() {
  await authStore.authLogin({
    username: form.username,
    password: form.password,
    captchaCode: form.captchaCode,
  }).catch(() => {
    loadCaptcha();
  });
}
</script>

<template>
  <Form layout="vertical">
    <FormItem label="用户名" required>
      <Input
        v-model:value="form.username"
        placeholder="请输入用户名"
        size="large"
        allow-clear
      />
    </FormItem>
    <FormItem label="密码" required>
      <Input
        v-model:value="form.password"
        type="password"
        placeholder="请输入密码"
        size="large"
        allow-clear
        @press-enter="handleSubmit"
      />
    </FormItem>
    <FormItem label="验证码" required>
      <div class="flex gap-2">
        <Input
          v-model:value="form.captchaCode"
          placeholder="请输入验证码"
          size="large"
          maxlength="4"
          allow-clear
          @press-enter="handleSubmit"
        />
        <div
          class="h-10 w-[120px] cursor-pointer overflow-hidden rounded border border-gray-200 bg-gray-50 flex items-center justify-center"
          :class="{ 'animate-pulse': captchaLoading }"
          @click="loadCaptcha"
        >
          <img
            v-if="captchaImage"
            :src="captchaImage"
            alt="验证码"
            class="h-full w-full object-contain"
          />
          <span v-else class="text-gray-400 text-sm">点击刷新</span>
        </div>
      </div>
    </FormItem>
    <div class="mb-4 flex justify-between text-sm">
      <label class="flex items-center gap-2">
        <input type="checkbox" class="rounded border-border" /> 记住我
      </label>
      <router-link to="/auth/forget-password" class="text-primary hover:underline">忘记密码</router-link>
    </div>
    <FormItem>
      <Button
        type="primary"
        size="large"
        block
        :loading="authStore.loginLoading"
        @click="handleSubmit"
      >
        登录
      </Button>
    </FormItem>
    <div class="mt-4 flex gap-2">
      <Button block size="large" @click="$router.push('/auth/code-login')">手机验证码登录</Button>
      <Button block size="large" @click="$router.push('/auth/qrcode-login')">扫码登录</Button>
    </div>
    <div class="mt-4 text-center text-sm text-muted-foreground">
      还没有账号？
      <router-link to="/auth/register" class="text-primary hover:underline">注册账号</router-link>
    </div>
  </Form>
</template>
