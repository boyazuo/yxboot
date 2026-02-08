<script setup lang="ts">
import { ref } from 'vue';
import { List, ListItem, ListItemMeta, Switch } from 'ant-design-vue';

const items = ref([
  { key: 'accountPassword', label: '账户密码', desc: '当前密码强度：强', value: true },
  { key: 'securityPhone', label: '密保手机', desc: '已绑定手机：138****8293', value: true },
  { key: 'securityQuestion', label: '密保问题', desc: '未设置密保问题，密保问题可有效保护账户安全', value: true },
  { key: 'securityEmail', label: '备用邮箱', desc: '已绑定邮箱：ant***sign.com', value: true },
  { key: 'securityMfa', label: 'MFA 设备', desc: '未绑定 MFA 设备，绑定后可以进行二次确认', value: false },
]);

function toggle(key: string) {
  const item = items.value.find((i) => i.key === key);
  if (item) item.value = !item.value;
}
</script>

<template>
  <div>
    <h3 class="mb-4 text-base font-medium text-foreground">安全设置</h3>
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
