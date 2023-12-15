<template>
  <a-row :gutter="16">
    <a-col :span="16">
      <userInfo class="mb-2" />
      <a-row :gutter="16" class="mt-10px">
        <a-col :span="12">
          <operateLog class="mb-2" />
        </a-col>
        <a-col :span="12">
          <visiteLog class="mb-2" />
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="8">
      <shortcut class="mb-2" />
      <schedule class="mt-10px" />
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
  import operateLog from './components/operateLog.vue'
  import schedule from './components/schedule.vue'
  import shortcut from './components/shortcut.vue'
  import userInfo from './components/userInfo.vue'
  import visiteLog from './components/visiteLog.vue'
</script>
<style lang="less" scope></style>
