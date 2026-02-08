<script setup lang="ts">
import { ref } from 'vue';
import { List, ListItem, ListItemMeta, Switch } from 'ant-design-vue';

const items = ref([
  { key: 'accountPassword', label: '账户密码', desc: '其他用户的消息将以站内信的形式通知', value: true },
  { key: 'systemMessage', label: '系统消息', desc: '系统消息将以站内信的形式通知', value: true },
  { key: 'todoTask', label: '待办任务', desc: '待办任务将以站内信的形式通知', value: true },
]);

function toggle(key: string) {
  const item = items.value.find((i) => i.key === key);
  if (item) item.value = !item.value;
}
</script>

<template>
  <div>
    <h3 class="mb-4 text-base font-medium text-foreground">新消息提醒</h3>
    <List item-layout="horizontal" :data-source="items">
      <template #renderItem="{ item }">
        <ListItem>
          <ListItemMeta :title="item.label" :description="item.desc" />
          <template #actions>
            <Switch :checked="item.value" @change="() => toggle(item.key)" />
          </template>
        </ListItem>
      </template>
    </List>
  </div>
</template>
