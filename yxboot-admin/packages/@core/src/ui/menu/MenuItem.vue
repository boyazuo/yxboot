<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted } from 'vue';
import type { MenuRecordRaw } from '../../base/types/menu-record';
import { MenuContextKey } from './MenuContext';

interface Props {
  item: MenuRecordRaw;
  parentPaths?: string[];
}

const props = defineProps<Props>();
const emit = defineEmits<{ click: [path: string] }>();

const ctx = inject(MenuContextKey);
const path = computed(() => props.item.path);
const parentPaths = computed(() => props.parentPaths ?? []);

const active = computed(() => ctx?.activePath.value === path.value);

function handleClick() {
  if (props.item.disabled) return;
  ctx?.handleSelect?.(path.value, parentPaths.value);
  emit('click', path.value);
}

onMounted(() => {
  // register if needed by parent
});

onBeforeUnmount(() => {
  // unregister
});
</script>

<template>
  <li
    class="core-menu-item vben-menu-item"
    :class="{
      'core-menu-item--active': active,
      'vben-menu-item is-active': active,
      'core-menu-item--disabled': item.disabled,
      'vben-menu-item is-disabled': item.disabled,
    }"
    role="menuitem"
    @click.stop="handleClick"
  >
    <div class="vben-menu-item__content">
      <span class="core-menu-item__icon vben-menu__icon">
        <slot name="icon">
          <span v-if="item.icon" class="core-menu-item__icon-slot" />
        </slot>
      </span>
      <span v-if="!ctx?.collapse?.value" class="core-menu-item__title">
        <slot name="title">{{ item.name }}</slot>
      </span>
    </div>
  </li>
</template>

<style scoped>
.core-menu-item {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--menu-item-height);
  padding: var(--menu-item-padding-y) var(--menu-item-padding-x);
  margin: var(--menu-item-margin-y) var(--menu-item-margin-x);
  font-size: var(--menu-font-size);
  color: hsl(var(--menu-item-color));
  cursor: pointer;
  list-style: none;
  border: none;
  border-radius: var(--menu-item-radius);
  background: hsl(var(--menu-background-color));
  transition: background 0.15s ease, color 0.15s ease, padding 0.15s ease;
}
.core-menu-item--active {
  color: hsl(var(--menu-item-active-color));
  background: hsl(var(--menu-item-active-background-color));
}
.core-menu-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: transparent !important;
}
.core-menu-item:not(.core-menu-item--active):not(.core-menu-item--disabled):hover {
  color: hsl(var(--menu-item-hover-color));
  background: hsl(var(--menu-item-hover-background-color));
}
.core-menu-item__icon {
  flex-shrink: 0;
  width: var(--menu-item-icon-size, 16px);
  height: var(--menu-item-icon-size, 16px);
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s;
}
.core-menu-item:hover .core-menu-item__icon {
  transform: scale(1.1);
}
.core-menu-item__icon-slot {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: currentColor;
  border-radius: 2px;
}
.core-menu-item__title {
  flex: 1;
  min-width: 0;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--menu-font-size);
}
</style>
