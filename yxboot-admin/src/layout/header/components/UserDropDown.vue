<template>
  <a-dropdown placement="bottomRight" class="user-dropdown">
    <a-avatar :src="userStoreData?.avatar">{{ userStoreData?.name }}</a-avatar>
    <template #overlay>
      <a-menu>
        <a-menu-item @click="$router.push({ path: '/personal/index' })">
          <Icon icon="ant-design:user-outlined" /> 个人中心
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item @click.prevent="handleLogout"> <Icon icon="ant-design:poweroff-outlined" /> 退出系统 </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>
  import Icon from '@/components/Icon'
  import { useUserStoreWithOut } from '@/store/modules/user'
  import { computed } from 'vue'

  defineOptions({ name: 'UserDropDown' })

  const userStore = useUserStoreWithOut()
  const userStoreData: any = computed(() => userStore.getUser)

  const handleLogout = async () => {
    await userStore.logout()
    window.location.reload()
  }
</script>
<style lang="less" scoped>
  .user-dropdown {
    border: 1px solid #ccc;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;
    margin: 0 5px;
  }
</style>
