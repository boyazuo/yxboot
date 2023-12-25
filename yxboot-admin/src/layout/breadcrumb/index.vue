<template>
  <a-breadcrumb :routes="routes">
    <template #itemRender="{ route }">
      <span>
        {{ route.meta.title }}
      </span>
    </template>
  </a-breadcrumb>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  const routes = ref<RouteLocationMatched[]>([])
  const { currentRoute } = useRouter()

  watchEffect(() => {
    routes.value = [currentRoute.value]
  })
</script>
<style lang="less"></style>
