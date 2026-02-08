<script setup lang="ts">
import Icon from '../../icon/Icon.vue';

const expandOnHover = defineModel<boolean>('expandOnHover');

function toggle() {
  expandOnHover.value = !expandOnHover.value;
}
</script>

<template>
  <div
    class="vben-sidebar-fixed-btn"
    role="button"
    tabindex="0"
    @click.stop="toggle"
  >
    <Icon v-if="!expandOnHover" icon="ep:unlock" :size="14" />
    <Icon v-else icon="ep:lock" :size="14" />
  </div>
</template>
