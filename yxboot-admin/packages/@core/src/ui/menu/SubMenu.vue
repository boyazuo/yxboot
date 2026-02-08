<script setup lang="ts">
import { computed, inject } from 'vue';
import type { MenuRecordRaw } from '../../base/types/menu-record';
import { MenuContextKey } from './MenuContext';
import CollapseTransition from './CollapseTransition.vue';

interface Props {
  item: MenuRecordRaw;
  parentPaths?: string[];
}

const props = defineProps<Props>();
const ctx = inject(MenuContextKey);

const path = computed(() => props.item.path);
const parentPaths = computed(() => props.parentPaths ?? []);
const opened = computed(() => ctx?.openedMenus.value?.includes(path.value) ?? false);

const isCollapsed = computed(() => ctx?.collapse?.value ?? false);

function handleTitleClick() {
  if (props.item.disabled) return;
  if (isCollapsed.value) return;
  ctx?.handleSubMenuClick?.(path.value, parentPaths.value);
}
</script>

<template>
  <li
    class="core-sub-menu vben-sub-menu"
    :class="{
      'core-sub-menu--opened': opened,
      'vben-sub-menu is-opened': opened,
      'core-sub-menu--disabled': item.disabled,
      'vben-sub-menu is-disabled': item.disabled,
      'vben-sub-menu is-active': opened,
    }"
  >
    <div
      class="core-sub-menu__title vben-sub-menu-content"
      :class="{ 'vben-sub-menu-content is-active': opened }"
      role="button"
      tabindex="0"
      @click.stop="handleTitleClick"
      @keydown.enter.space.prevent="handleTitleClick"
    >
      <span class="core-sub-menu__icon vben-menu__icon">
        <slot name="icon">
          <span v-if="item.icon" class="core-menu-item__icon-slot" />
        </slot>
      </span>
      <div v-if="!isCollapsed" class="vben-sub-menu-content__title">
        <slot name="title">{{ item.name }}</slot>
      </div>
      <span
        v-if="!isCollapsed"
        class="core-sub-menu__arrow vben-sub-menu-content__icon-arrow"
        :class="{ 'core-sub-menu__arrow--opened': opened }"
        :style="opened ? { transform: 'rotate(180deg)' } : {}"
      >
        ▾
      </span>
    </div>
    <CollapseTransition>
      <ul v-show="opened" class="core-sub-menu__list vben-sub-menu__list">
        <slot />
      </ul>
    </CollapseTransition>
  </li>
</template>

<style scoped>
.core-sub-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  background: hsl(var(--menu-submenu-background-color));
}
.core-sub-menu--opened > .core-sub-menu__title {
  color: hsl(var(--menu-submenu-active-color));
  background: hsl(var(--menu-submenu-active-background-color));
}
.core-sub-menu__title {
  display: flex;
  align-items: center;
  height: var(--menu-item-height);
  padding: var(--menu-item-padding-y) var(--menu-item-padding-x);
  margin: var(--menu-item-margin-y) var(--menu-item-margin-x);
  font-size: var(--menu-font-size);
  color: hsl(var(--menu-item-color));
  cursor: pointer;
  border-radius: var(--menu-item-radius);
  background: hsl(var(--menu-background-color));
  transition: background 0.15s ease, color 0.15s ease;
}
.core-sub-menu__title:hover {
  color: hsl(var(--menu-submenu-hover-color));
  background: hsl(var(--menu-submenu-hover-background-color));
}
.core-sub-menu--disabled .core-sub-menu__title {
  opacity: 0.5;
  cursor: not-allowed;
}
.core-sub-menu__icon {
  flex-shrink: 0;
  width: var(--menu-item-icon-size, 16px);
  height: var(--menu-item-icon-size, 16px);
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.core-menu-item__icon-slot {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: currentColor;
  border-radius: 2px;
}
.core-sub-menu__label {
  flex: 1;
  min-width: 0;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  font-size: var(--menu-font-size);
}
.core-sub-menu__arrow {
  flex-shrink: 0;
  margin-right: 0;
  margin-left: auto;
  padding-left: 4px;
  transition: transform 0.25s ease;
  font-size: 12px;
  opacity: 0.85;
}
.core-sub-menu__arrow--opened {
  transform: rotate(90deg);
}
.core-sub-menu__list {
  list-style: none;
  padding: 0 0 0 var(--menu-item-indent);
  margin: 0;
  background: hsl(var(--menu-submenu-background-color));
}
</style>
