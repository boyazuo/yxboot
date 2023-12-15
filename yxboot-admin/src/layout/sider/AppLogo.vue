<template>
  <div class="logo" :style="{ width: `${getMenuWidth}px` }">
    <img src="/favicon.png" alt="" />
    <div class="title">{{ title }}</div>
  </div>
</template>
<script lang="ts" setup>
  import { useGlobSetting } from '@/hooks/setting/index'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  const { title } = useGlobSetting()

  const { getMenuWidth } = useMenuSetting()
</script>
<style lang="less" scope>
  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    height: 48px;
    padding: 10px 4px 10px 10px;

    img {
      width: 32px;
      height: 32px;
      margin-right: 2px;
    }

    .title {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
      line-height: normal;
      margin-left: 8px;
    }
  }
</style>
