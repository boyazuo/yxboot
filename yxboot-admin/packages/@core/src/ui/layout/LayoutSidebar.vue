<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed } from "vue";
import { SidebarCollapseButton, SidebarFixedButton } from "./widgets";

interface Props {
	width?: number;
	collapsedWidth?: number;
	collapsed?: boolean;
	show?: boolean;
	theme?: "light" | "dark";
	showCollapseButton?: boolean;
	showFixedButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	width: 224,
	collapsedWidth: 60,
	collapsed: false,
	show: true,
	theme: "dark",
	showCollapseButton: true,
	showFixedButton: false,
});

const collapsed = defineModel<boolean>("collapsed");
const expandOnHover = defineModel<boolean>("expandOnHover", { default: false });

const currentWidth = computed(() =>
	props.collapsed ? props.collapsedWidth : props.width,
);

const asideStyle = computed(
	(): CSSProperties => ({
		width: `${currentWidth.value}px`,
		minWidth: `${currentWidth.value}px`,
		maxWidth: `${currentWidth.value}px`,
		marginLeft: props.show ? 0 : `-${currentWidth.value}px`,
	}),
);

const contentStyle = computed((): CSSProperties => ({}));
</script>

<template>
  <aside
    v-show="show"
    class="vben-layout-sidebar"
    :class="[
      `vben-layout-sidebar--${theme}`,
      { 'vben-layout-sidebar--collapsed': collapsed },
    ]"
    :style="asideStyle"
  >
    <SidebarFixedButton
      v-if="!collapsed && showFixedButton"
      v-model:expand-on-hover="expandOnHover"
    />
    <div v-if="$slots.logo" class="vben-layout-sidebar__logo">
      <slot name="logo" />
    </div>
    <div class="vben-layout-sidebar__scroll" :style="contentStyle">
      <slot />
    </div>
    <div class="vben-layout-sidebar__footer-spacer" />
    <SidebarCollapseButton
      v-if="showCollapseButton"
      v-model:collapsed="collapsed"
    />
  </aside>
</template>

<style scoped>
/* 样式见 layout-vben.css，此处仅保留需动态的 style 绑定 */
</style>
