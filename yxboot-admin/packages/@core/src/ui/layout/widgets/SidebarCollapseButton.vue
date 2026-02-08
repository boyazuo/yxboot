<script setup lang="ts">
import Icon from '../../icon/Icon.vue';

const collapsed = defineModel<boolean>('collapsed');

function handleClick() {
  collapsed.value = !collapsed.value;
}
</script>

<template>
  <div
    class="vben-sidebar-collapse-btn"
    role="button"
    tabindex="0"
    @click.stop="handleClick"
  >
    <Icon v-if="collapsed" icon="ep:arrow-right" :size="16" />
    <Icon v-else icon="ep:arrow-left" :size="16" />
  </div>
</template>
