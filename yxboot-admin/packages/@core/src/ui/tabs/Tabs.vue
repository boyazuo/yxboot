<script setup lang="ts">
import type { TabDefinition } from '../../base/types/tabs';
import { getTabKey } from '../../base/types/tabs';
import { computed } from 'vue';
import Icon from '../icon/Icon.vue';

interface TabView {
  key: string;
  title: string;
  affixTab: boolean;
  closable: boolean;
  icon?: string;
}

interface Props {
  tabs?: TabDefinition[];
  active?: string;
  showIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tabs: () => [],
  active: '',
  showIcon: true,
});

const emit = defineEmits<{
  close: [key: string];
  'update:active': [key: string];
  select: [key: string];
  unpin: [TabView];
}>();

const activeKey = computed({
  get: () => props.active,
  set: (v) => {
    emit('update:active', v);
    emit('select', v);
  },
});

function getTabTitle(tab: TabDefinition): string {
  const meta = (tab.meta ?? {}) as Record<string, unknown>;
  const leafMeta = tab.matched?.length
    ? (tab.matched[tab.matched.length - 1]?.meta as Record<string, unknown> | undefined)
    : undefined;
  const title =
    (meta.newTabTitle ?? leafMeta?.title ?? meta.title ?? tab.name ?? tab.path ?? (tab as any).key ?? getTabKey(tab)) as
      | string
      | undefined;
  return title ?? '';
}

const tabsView = computed((): TabView[] =>
  props.tabs.map((tab) => {
    const key = (tab as any).key ?? getTabKey(tab);
    const meta = (tab.meta ?? {}) as Record<string, unknown>;
    const leaf = tab.matched?.length ? tab.matched[tab.matched.length - 1]?.meta : undefined;
    const leafRecord = leaf as Record<string, unknown> | undefined;
    return {
      key,
      title: getTabTitle(tab),
      affixTab: !!(meta.affixTab ?? meta.affix),
      closable: meta.tabClosable !== false,
      icon: (leafRecord?.icon ?? meta.icon) as string | undefined,
    };
  }),
);

function handleClick(key: string) {
  activeKey.value = key;
}

function handleClose(e: MouseEvent, tab: TabView) {
  e.stopPropagation();
  if (tab.affixTab || !tab.closable) return;
  emit('close', tab.key);
}

function handleMiddleDown(e: MouseEvent, tab: TabView) {
  if (e.button === 1 && tab.closable && !tab.affixTab) {
    e.preventDefault();
    emit('close', tab.key);
  }
}
</script>

<template>
  <div class="core-tabs">
    <TransitionGroup name="slide-left" tag="div" class="core-tabs__list">
      <div
        v-for="tab in tabsView"
        :key="tab.key"
        class="core-tabs__item"
        :class="{
          'core-tabs__item--active': activeKey === tab.key,
          'core-tabs__item--affix': tab.affixTab,
        }"
        role="tab"
        tabindex="0"
        @click="handleClick(tab.key)"
        @mousedown="handleMiddleDown($event, tab)"
      >
        <span v-if="showIcon && tab.icon" class="core-tabs__icon">
          <Icon :icon="tab.icon" :size="14" />
        </span>
        <span class="core-tabs__title">{{ tab.title }}</span>
        <span class="core-tabs__extra">
          <button
            v-if="tab.affixTab && tab.closable"
            type="button"
            class="core-tabs__pin"
            aria-label="取消固定"
            @click.stop="emit('unpin', tab)"
          >
            📌
          </button>
          <button
            v-if="!tab.affixTab && tab.closable"
            type="button"
            class="core-tabs__close"
            aria-label="关闭"
            @click="handleClose($event, tab)"
          >
            ×
          </button>
        </span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.core-tabs {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: 24px;
  overflow: hidden;
}
.core-tabs__list {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 0;
  width: max-content;
  min-width: 0;
}
.core-tabs__item {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  margin-right: 2px;
  flex-shrink: 0;
  font-size: 13px;
  color: hsl(var(--muted-foreground));
  background: transparent;
  border: none;
  border-left: 1px solid hsl(var(--border));
  border-radius: 0;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  list-style: none;
}
.core-tabs__item:last-child {
  border-right: 1px solid hsl(var(--border));
}
.core-tabs__item:hover {
  color: hsl(var(--foreground));
  background: hsl(var(--accent));
}
.core-tabs__item--active {
  color: hsl(var(--primary));
  background: hsl(var(--accent));
}
.core-tabs__item--affix {
  /* 固定标签样式可扩展 */
}
.core-tabs__icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  margin-right: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.core-tabs__title {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.core-tabs__extra {
  margin-left: 4px;
  display: flex;
  align-items: center;
  gap: 2px;
}
.core-tabs__close,
.core-tabs__pin {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  font-size: 14px;
  line-height: 1;
  color: inherit;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.15s, background 0.15s;
}
.core-tabs__close:hover,
.core-tabs__pin:hover {
  opacity: 1;
  background: hsl(var(--accent-hover));
}
</style>
