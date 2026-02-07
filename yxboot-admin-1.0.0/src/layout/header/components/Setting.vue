<template>
  <div @click="openDrawer(true)">
    <Icon icon="ion:settings-outline" />
    <SettingDrawer @register="register" />
  </div>
</template>
<script lang="ts" setup>
import { useDrawer } from '@/components/Drawer'
import Icon from '@/components/Icon'
import SettingDrawer from '@/layout/setting/SettingDrawer.vue'

defineOptions({ name: 'SettingButton' })

const [register, { openDrawer }] = useDrawer()
</script>
