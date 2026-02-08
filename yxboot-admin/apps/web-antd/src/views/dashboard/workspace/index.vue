<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Card, Row, Col, List, Avatar, Tag } from 'ant-design-vue';
import { useUserStore } from '@yxboot/core';

const userStore = useUserStore();
const defaultAvatar = 'https://avatar.vercel.sh/user?size=64';

const quickNavItems = [
  { title: '首页', path: '/', color: '#1fdaca' },
  { title: '仪表盘', path: '/dashboard/workspace', color: '#bf0c2c' },
  { title: '分析页', path: '/dashboard/analytics', color: '#e18525' },
  { title: '个人中心', path: '/profile', color: '#3fb27f' },
  { title: '关于', path: '/about', color: '#00d8ff' },
];

const projectItems = [
  { title: 'Github', group: '开源组', content: '不要等待机会，而要创造机会。', icon: 'carbon:logo-github' },
  { title: 'Vue', group: '算法组', content: '现在的你决定将来的你。', icon: 'ion:logo-vue' },
  { title: 'React', group: '技术牛', content: '健康的身体是实现目标的基石。', icon: 'bx:bxl-react' },
];

const todoItems = ref([
  { title: '审查前端代码提交', content: '审查最近提交到 Git 仓库的前端代码', completed: false },
  { title: '系统性能优化', content: '检查并优化系统性能，降低 CPU 使用率', completed: true },
  { title: '安全检查', content: '进行系统安全检查，确保没有安全漏洞', completed: false },
  { title: '更新项目依赖', content: '更新项目中的所有 npm 依赖包', completed: false },
]);

const trendItems = [
  { title: '威廉', content: '在 开源组 创建了项目 Vue', date: '刚刚' },
  { title: '艾文', content: '关注了 威廉', date: '1个小时前' },
  { title: '克里斯', content: '发布了 个人动态', date: '1天前' },
];

const router = useRouter();

function navTo(path: string) {
  router.push(path);
}
</script>

<template>
  <div class="workspace-page p-5">
    <div class="workspace-page__header mb-5">
      <div class="flex items-center gap-3">
        <Avatar
          :src="userStore.userInfo?.avatar ?? defaultAvatar"
          :size="56"
          class="flex-shrink-0"
        />
        <div>
          <h1 class="workspace-page__title m-0 text-xl font-semibold text-foreground">
            早安，{{ userStore.userInfo?.realName ?? userStore.userInfo?.username ?? '用户' }}，开始您一天的工作吧！
          </h1>
          <p class="workspace-page__desc m-0 mt-1 text-sm text-muted-foreground">
            今日晴，20℃ - 32℃
          </p>
        </div>
      </div>
    </div>

    <Row :gutter="[16, 16]">
      <Col :xs="24" :lg="14">
        <Card title="项目" class="workspace-card mb-4">
          <div class="flex flex-wrap gap-3">
            <div
              v-for="(item, i) in projectItems"
              :key="i"
              class="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
              @click="navTo('/')"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                :style="{ background: ['#3fb27f', '#e18525', '#00d8ff'][i % 3] }"
              >
                {{ item.title.charAt(0) }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="font-medium text-foreground">{{ item.title }}</div>
                <div class="text-muted-foreground text-xs">{{ item.group }}</div>
              </div>
            </div>
          </div>
        </Card>
        <Card title="最新动态" class="workspace-card">
          <List :data-source="trendItems" size="small">
            <template #renderItem="{ item }">
              <List.Item>
                <List.Item.Meta>
                  <template #avatar>
                    <Avatar size="small">{{ item.title.charAt(0) }}</Avatar>
                  </template>
                  <template #title>
                    <span class="text-sm">{{ item.title }}</span>
                    <span class="text-muted-foreground ml-2 text-xs">{{ item.date }}</span>
                  </template>
                  <template #description>
                    <span class="text-muted-foreground text-xs" v-html="item.content" />
                  </template>
                </List.Item.Meta>
              </List.Item>
            </template>
          </List>
        </Card>
      </Col>
      <Col :xs="24" :lg="10">
        <Card title="快捷导航" class="workspace-card mb-4">
          <div class="flex flex-wrap gap-2">
            <Tag
              v-for="(nav, i) in quickNavItems"
              :key="i"
              :color="nav.color"
              class="cursor-pointer"
              @click="navTo(nav.path)"
            >
              {{ nav.title }}
            </Tag>
          </div>
        </Card>
        <Card title="待办事项" class="workspace-card">
          <List :data-source="todoItems" size="small">
            <template #renderItem="{ item }">
              <List.Item>
                <span :class="{ 'text-muted-foreground line-through': item.completed }">
                  {{ item.title }}
                </span>
              </List.Item>
            </template>
          </List>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<style scoped>
.workspace-page {
  min-height: 100%;
  background: hsl(var(--background));
}
.workspace-card :deep(.ant-card-head) {
  border-bottom: 1px solid hsl(var(--border));
  font-weight: 500;
}
.workspace-card :deep(.ant-card-body) {
  padding: 16px;
}
</style>
