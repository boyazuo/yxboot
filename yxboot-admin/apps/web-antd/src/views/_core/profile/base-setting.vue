<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { Form, FormItem, Input, Button, Select } from 'ant-design-vue';
import { useUserStore } from '@yxboot/core';
import { getUserInfoApi } from '@/api/core/user';

const userStore = useUserStore();
const form = reactive({
  realName: '',
  username: '',
  roles: [] as string[],
  introduction: '',
});

const roleOptions = [
  { label: '管理员', value: 'super' },
  { label: '用户', value: 'user' },
  { label: '测试', value: 'test' },
];

onMounted(async () => {
  try {
    const data = await getUserInfoApi();
    if (data) {
      form.realName = data.realName ?? '';
      form.username = data.username ?? '';
      form.roles = Array.isArray((data as any).roles) ? (data as any).roles : [];
      form.introduction = (data as any).introduction ?? '';
    }
  } catch {
    if (userStore.userInfo) {
      form.realName = userStore.userInfo.realName ?? '';
      form.username = userStore.userInfo.username ?? '';
    }
  }
});

function handleSubmit() {
  // TODO: 调用更新接口
}
</script>

<template>
  <div>
    <h3 class="mb-4 text-base font-medium text-foreground">基本设置</h3>
    <Form layout="vertical" class="max-w-xl">
      <FormItem label="姓名">
        <Input v-model:value="form.realName" placeholder="请输入姓名" allow-clear />
      </FormItem>
      <FormItem label="用户名">
        <Input v-model:value="form.username" placeholder="请输入用户名" allow-clear disabled />
      </FormItem>
      <FormItem label="角色">
        <Select
          v-model:value="form.roles"
          mode="multiple"
          placeholder="请选择角色"
          :options="roleOptions"
          class="w-full"
        />
      </FormItem>
      <FormItem label="个人简介">
        <Input.TextArea
          v-model:value="form.introduction"
          placeholder="请输入个人简介"
          :rows="4"
          allow-clear
        />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
