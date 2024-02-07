<template>
  <a-page-header :ghost="false" style="margin: -10px">
    <WorkbenchHeader />
  </a-page-header>
  <div class="lg:flex" style="margin-top: 25px">
    <div class="lg:w-7/10 w-full !mr-4 enter-y">
      <ProjectCard :loading="loading" class="enter-y" />
      <DynamicInfo :loading="loading" class="!my-4 enter-y" />
    </div>
    <div class="lg:w-3/10 w-full enter-y">
      <QuickNav :loading="loading" class="enter-y" />
      <a-card class="!my-4 enter-y" :loading="loading">
        <a-calendar :fullscreen="false" />
      </a-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import DynamicInfo from './components/DynamicInfo.vue'
  import ProjectCard from './components/ProjectCard.vue'
  import QuickNav from './components/QuickNav.vue'
  import WorkbenchHeader from './components/WorkbenchHeader.vue'

  const loading = ref(true)

  setTimeout(() => {
    loading.value = false
  }, 1000)
</script>
