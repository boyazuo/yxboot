<template>
  <a-card :bordered="false">
    <div style="display: flex; justify-content: space-between">
      <div style="display: flex">
        <a-avatar
          style="width: 60px; height: 60px"
          :src="userInfo.avatar"
          :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
        />
        <div class="username-box">
          <span style="font-weight: 600; margin: 2px; font-size: 18px">{{ userInfo.name }}</span>
          <span style="color: #6d737b; margin: 2px">{{ userInfo.username }} | {{ userInfo.email }}</span>
        </div>
      </div>
      <span style="margin: 2px">
        {{ currentTime }}
      </span>
    </div>
  </a-card>
</template>

<script setup>
  import { useUserStore } from '@/store/modules/user'
  import dayjs from 'dayjs'
  import { onBeforeUnmount } from 'vue'

  const userStore = useUserStore()
  const userInfo = ref()
  userInfo.value = userStore.getUser

  const currentTime = ref(dayjs().format('YYYY年MM月DD日 HH时mm分ss秒'))
  const interval = window.setInterval(() => {
    currentTime.value = dayjs().format('YYYY年MM月DD日 HH时mm分ss秒')
  }, 1000)
  onBeforeUnmount(() => {
    window.clearInterval(interval)
  })
</script>

<style scoped>
  .username-box {
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
