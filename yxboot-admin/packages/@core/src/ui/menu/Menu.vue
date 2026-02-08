<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import type { MenuRecordRaw } from '../../base/types/menu-record';
import { MenuContextKey } from './MenuContext';
import MenuItem from './MenuItem.vue';
import SubMenu from './SubMenu.vue';

interface Props {
  items?: MenuRecordRaw[];
  activeKey?: string;
  defaultOpeneds?: string[];
  collapse?: boolean;
  theme?: 'light' | 'dark';
  accordion?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  activeKey: '',
  defaultOpeneds: () => [],
  collapse: false,
  theme: 'dark',
  accordion: true,
});

const emit = defineEmits<{ select: [path: string] }>();

const activePath = ref(props.activeKey);
const openedMenus = ref<string[]>([...props.defaultOpeneds]);

watch(
  () => props.activeKey,
  (v) => {
    activePath.value = v;
  },
);

watch(
  () => props.collapse,
  (v) => {
    if (v) openedMenus.value = [];
  },
);

function openMenu(path: string, parentPaths: string[]) {
  if (openedMenus.value.includes(path)) return;
  if (props.accordion) {
    openedMenus.value = openedMenus.value.filter((p) => parentPaths.includes(p));
  }
  openedMenus.value.push(path);
}

function closeMenu(path: string, parentPaths: string[]) {
  if (props.accordion) {
    openedMenus.value = parentPaths;
  } else {
    const i = openedMenus.value.indexOf(path);
    if (i !== -1) openedMenus.value.splice(i, 1);
  }
}

function handleSelect(path: string, _parentPaths: string[]) {
  activePath.value = path;
  emit('select', path);
}

function handleSubMenuClick(path: string, parentPaths: string[]) {
  const isOpened = openedMenus.value.includes(path);
  if (isOpened) {
    closeMenu(path, parentPaths);
  } else {
    openMenu(path, parentPaths);
  }
}

const collapse = ref(props.collapse);
watch(
  () => props.collapse,
  (v) => {
    collapse.value = v;
  },
);

const theme = ref(props.theme);
watch(
  () => props.theme,
  (v) => {
    theme.value = v;
  },
);

provide(MenuContextKey, {
  activePath,
  openedMenus,
  collapse,
  theme,
  handleSelect,
  handleSubMenuClick,
  openMenu,
  closeMenu,
});

</script>

<template>
  <ul
    class="core-menu vben-menu is-vertical is-rounded"
    :class="[
      `core-menu--${theme}`,
      `is-${theme}`,
      { 'core-menu--collapse': collapse, 'is-collapse': collapse },
    ]"
    role="menu"
  >
    <template v-for="(item, idx) in items" :key="item.path || idx">
      <SubMenu
        v-if="item.children?.length"
        :item="item"
        :parent-paths="item.parents ?? [item.path]"
      >
        <template #icon>
          <slot name="icon" :item="item" />
        </template>
        <template #title>
          <slot name="title" :item="item">{{ item.name }}</slot>
        </template>
        <template v-for="(child, cidx) in item.children" :key="child.path || cidx">
          <MenuItem
            v-if="!child.children?.length"
            :item="child"
            :parent-paths="[...(item.parents ?? []), item.path]"
            @click="(path) => $emit('select', path)"
          >
            <template #icon>
              <slot name="icon" :item="child" />
            </template>
            <template #title>
              <slot name="title" :item="child">{{ child.name }}</slot>
            </template>
          </MenuItem>
          <SubMenu
            v-else
            :item="child"
            :parent-paths="[...(item.parents ?? []), item.path]"
          >
            <template #icon>
              <slot name="icon" :item="child" />
            </template>
            <template #title>
              <slot name="title" :item="child">{{ child.name }}</slot>
            </template>
            <MenuItem
              v-for="(c2, c2idx) in child.children"
              :key="c2.path || c2idx"
              :item="c2"
              :parent-paths="[...(item.parents ?? []), item.path, child.path]"
              @click="(path) => $emit('select', path)"
            >
              <template #icon>
                <slot name="icon" :item="c2" />
              </template>
              <template #title>
                <slot name="title" :item="c2">{{ c2.name }}</slot>
              </template>
            </MenuItem>
          </SubMenu>
        </template>
      </SubMenu>
      <MenuItem
        v-else
        :item="item"
        :parent-paths="item.parents ?? []"
        @click="(path) => $emit('select', path)"
      >
        <template #icon>
          <slot name="icon" :item="item" />
        </template>
        <template #title>
          <slot name="title" :item="item">{{ item.name }}</slot>
        </template>
      </MenuItem>
    </template>
    <slot />
  </ul>
</template>

<style src="./menu-vben.css" />
<style scoped>
.core-menu {
  padding: 0;
  margin: 0;
  list-style: none;
  background: hsl(var(--menu-background-color));
  box-sizing: border-box;
}
.core-menu--dark {
  --menu-item-color: 0 0% 95%;
  --menu-item-hover-color: var(--accent-foreground);
  --menu-item-hover-background-color: var(--accent);
  --menu-item-active-color: var(--accent-foreground);
  --menu-item-active-background-color: var(--accent);
  --menu-submenu-hover-color: var(--foreground);
  --menu-submenu-hover-background-color: var(--accent);
  --menu-submenu-active-color: var(--foreground);
  --menu-submenu-active-background-color: transparent;
}
.core-menu--light {
  --menu-item-color: var(--foreground);
  --menu-item-hover-color: var(--foreground);
  --menu-item-hover-background-color: var(--accent);
  --menu-item-active-color: var(--primary);
  --menu-item-active-background-color: 212 100% 45% / 0.15;
  --menu-submenu-hover-color: var(--primary);
  --menu-submenu-hover-background-color: var(--accent);
  --menu-submenu-active-color: var(--primary);
  --menu-submenu-active-background-color: transparent;
}
.core-menu--collapse .core-menu-item__title,
.core-menu--collapse .core-sub-menu__label,
.core-menu--collapse .core-sub-menu__arrow {
  display: none;
}
.core-menu--collapse .core-menu-item,
.core-menu--collapse .core-sub-menu__title {
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
  margin-left: 6px;
  margin-right: 6px;
}
</style>
