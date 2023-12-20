<template>
  <div class="page">
    <a-tabs tab-position="left" animated :tabBarStyle="{}">
      <a-tab-pane v-for="(item, index) in tabPane" :key="index" :tab="item.label">
        <component :is="item.compontent" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import BasicInfo from './components/BasicInfo.vue'
  import ChangePwd from './components/ChangePwd.vue'

  const tabPane = shallowRef([
    { compontent: BasicInfo, label: '基本信息' },
    { compontent: ChangePwd, label: '修改密码' }
  ])
</script>

<style lang="less" scoped>
  .page {
    background-color: @component-background;
  }
</style>
