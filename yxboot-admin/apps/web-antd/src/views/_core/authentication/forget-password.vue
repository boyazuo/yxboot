<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Form, FormItem, Button, Input } from 'ant-design-vue';

const router = useRouter();
const loading = ref(false);
const form = reactive({
  email: '',
});

function handleSubmit() {
  loading.value = true;
  // TODO: 调用找回密码接口
  setTimeout(() => {
    loading.value = false;
    router.push('/auth/login');
  }, 500);
}
</script>

<template>
  <Form layout="vertical">
    <FormItem label="邮箱" required>
      <Input
        v-model:value="form.email"
        placeholder="example@example.com"
        size="large"
        allow-clear
      />
    </FormItem>
    <FormItem>
      <Button
        type="primary"
        size="large"
        block
        :loading="loading"
        @click="handleSubmit"
      >
        发送重置链接
      </Button>
    </FormItem>
    <div class="text-center text-sm text-muted-foreground">
      <router-link to="/auth/login" class="text-primary hover:underline">返回登录</router-link>
    </div>
  </Form>
</template>
