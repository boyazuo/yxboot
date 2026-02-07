<template>
  <div class="lg:flex">
    <div class="flex justify-start w-8/12">
      <Avatar :src="userinfo.avatar" :size="72" />
      <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
        <div class="md:text-lg text-md mb-2 font-bold"> 早安 {{ userinfo.name }}，开始您一天的工作吧！</div>
        <span class="text-secondary"> 某某事业群 - 某某技术部 - 技术经理 </span>
      </div>
    </div>
    <div class="flex justify-end w-4/12">
      <div class="flex flex-col justify-center flex-1 text-center">
        <span class="text-secondary mb-2"> 待办事项 </span>
        <span class="text-2xl">2 / 10</span>
      </div>
      <div class="flex flex-col justify-center flex-1 text-center">
        <span class="text-secondary mb-2"> 项目数 </span>
        <span class="text-2xl">8</span>
      </div>
      <div class="flex flex-col justify-center flex-1 text-center">
        <span class="text-secondary mb-2"> 团队 </span>
        <span class="text-2xl">300</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
import { Avatar } from 'ant-design-vue'

const userStore = useUserStore()
const userinfo = computed(() => userStore.getUser)
</script>
<style scoped>
  html[data-theme='light'] .text-secondary {
    color: rgb(0 0 0 / 45%);
  }
</style>
