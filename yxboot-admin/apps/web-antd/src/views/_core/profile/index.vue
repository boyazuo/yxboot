<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@yxboot/core";
import { Card, Avatar } from "ant-design-vue";
import ProfileBase from "./base-setting.vue";
import ProfileNotificationSetting from "./notification-setting.vue";
import ProfilePasswordSetting from "./password-setting.vue";
import ProfileSecuritySetting from "./security-setting.vue";

const userStore = useUserStore();
const activeKey = ref("basic");

const tabs = [
	{ key: "basic", label: "基本设置" },
	{ key: "security", label: "安全设置" },
	{ key: "password", label: "修改密码" },
	{ key: "notice", label: "新消息提醒" },
];

const defaultAvatar = "https://avatar.vercel.sh/user?size=80";
const avatarSrc = userStore.userInfo?.avatar ?? defaultAvatar;
</script>

<template>
  <div class="flex h-full w-full gap-4 p-4">
    <Card class="w-64 flex-shrink-0">
      <div class="flex flex-col items-center border-b border-border pb-4">
        <Avatar :src="avatarSrc" :size="80" class="mb-4" />
        <span class="text-lg font-semibold text-foreground">
          {{ userStore.userInfo?.realName ?? '-' }}
        </span>
        <span class="text-muted-foreground text-sm">
          {{ userStore.userInfo?.username ?? '-' }}
        </span>
      </div>
      <div class="mt-4 flex flex-col gap-1">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          class="profile-tab rounded px-4 py-3 text-left text-sm transition-colors"
          :class="{ 'bg-primary': activeKey === tab.key }"
          @click="activeKey = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
    </Card>
    <Card class="min-w-0 flex-1 p-8">
      <ProfileBase v-if="activeKey === 'basic'" />
      <ProfileSecuritySetting v-else-if="activeKey === 'security'" />
      <ProfilePasswordSetting v-else-if="activeKey === 'password'" />
      <ProfileNotificationSetting v-else-if="activeKey === 'notice'" />
    </Card>
  </div>
</template>

<style scoped>
.profile-tab:hover:not(.bg-primary) {
  background: hsl(var(--accent));
}
</style>
