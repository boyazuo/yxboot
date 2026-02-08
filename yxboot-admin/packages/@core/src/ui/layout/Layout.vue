<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed, provide, ref, watch } from "vue";
import LayoutContent from "./LayoutContent.vue";
import LayoutFooter from "./LayoutFooter.vue";
import LayoutHeader from "./LayoutHeader.vue";
import LayoutSidebar from "./LayoutSidebar.vue";
import LayoutTabbar from "./LayoutTabbar.vue";

export interface LayoutProps {
	sidebarWidth?: number;
	sidebarCollapsedWidth?: number;
	sidebarCollapsed?: boolean;
	sidebarTheme?: "light" | "dark";
	sidebarShowCollapseButton?: boolean;
	headerHeight?: number;
	headerTheme?: "light" | "dark";
	headerVisible?: boolean;
	tabbarEnable?: boolean;
	tabbarHeight?: number;
	footerEnable?: boolean;
	footerHeight?: number;
	footerFixed?: boolean;
	contentPadding?: number;
	contentCompact?: "wide" | "compact";
	contentCompactWidth?: number;
	isMobile?: boolean;
	zIndex?: number;
}

const props = withDefaults(defineProps<LayoutProps>(), {
	sidebarWidth: 224,
	sidebarCollapsedWidth: 60,
	sidebarCollapsed: false,
	sidebarTheme: "light",
	sidebarShowCollapseButton: true,
	headerHeight: 48,
	headerTheme: "light",
	headerVisible: true,
	tabbarEnable: true,
	tabbarHeight: 40,
	footerEnable: false,
	footerHeight: 32,
	footerFixed: true,
	contentPadding: 16,
	contentCompact: "wide",
	contentCompactWidth: 1200,
	isMobile: false,
	zIndex: 200,
});

const emit = defineEmits<{ "update:sidebarCollapsed": [value: boolean] }>();

const sidebarCollapsed = ref(props.sidebarCollapsed);
watch(
	() => props.sidebarCollapsed,
	(v) => {
		sidebarCollapsed.value = v;
	},
);
watch(sidebarCollapsed, (v) => {
	emit("update:sidebarCollapsed", v);
});

const maskVisible = computed(() => props.isMobile && !sidebarCollapsed.value);

const mainMarginLeft = computed(() => {
	if (props.isMobile) return 0;
	return sidebarCollapsed.value
		? props.sidebarCollapsedWidth
		: props.sidebarWidth;
});

const contentMarginTop = computed(() => {
	let h = props.headerVisible ? props.headerHeight : 0;
	if (props.tabbarEnable) h += props.tabbarHeight;
	return h;
});

const contentPaddingBottom = computed(() =>
	props.footerEnable && props.footerFixed ? props.footerHeight : 0,
);

const mainStyle = computed(
	(): CSSProperties => ({
		marginLeft: props.isMobile ? 0 : `${mainMarginLeft.value}px`,
		paddingBottom: `${contentPaddingBottom.value}px`,
	}),
);

const headerWrapHeight = computed(
	() =>
		(props.headerVisible ? props.headerHeight : 0) +
		(props.tabbarEnable ? props.tabbarHeight : 0),
);

const headerWrapStyle = computed(
	(): CSSProperties => ({
		left: props.isMobile ? 0 : `${mainMarginLeft.value}px`,
		width: props.isMobile ? "100%" : `calc(100% - ${mainMarginLeft.value}px)`,
		height: `${headerWrapHeight.value}px`,
		minHeight: `${headerWrapHeight.value}px`,
		zIndex: props.zIndex,
	}),
);

const contentWrapStyle = computed(
	(): CSSProperties => ({
		marginTop: `${contentMarginTop.value}px`,
	}),
);

provide("layoutCollapsed", sidebarCollapsed);
provide("layoutMobile", () => props.isMobile);

function handleToggleSidebar() {
	if (props.isMobile) {
		sidebarCollapsed.value = false;
	} else {
		sidebarCollapsed.value = !sidebarCollapsed.value;
	}
}

function handleMaskClick() {
	sidebarCollapsed.value = true;
}
</script>

<template>
  <div class="core-layout">
    <LayoutSidebar
      v-model:collapsed="sidebarCollapsed"
      :width="sidebarWidth"
      :collapsed-width="sidebarCollapsedWidth"
      :show="!isMobile"
      :theme="sidebarTheme"
      :show-collapse-button="sidebarShowCollapseButton"
    >
      <template #logo>
        <slot name="logo" />
      </template>
      <slot name="menu" />
    </LayoutSidebar>

    <div class="core-layout__main" :style="mainStyle">
      <div v-if="headerVisible || tabbarEnable" class="core-layout__header-wrap" :style="headerWrapStyle">
        <LayoutHeader
          v-if="headerVisible"
          :height="headerHeight"
          :theme="headerTheme"
        >
          <template #logo>
            <!-- 仅侧栏折叠时在 header 显示 logo，避免与侧栏重复 -->
            <slot v-if="sidebarCollapsed" name="header-logo" />
          </template>
          <template #toggle>
            <slot name="header-toggle" :toggle="handleToggleSidebar" :collapsed="sidebarCollapsed">
              <button
                type="button"
                class="core-layout__toggle-btn"
                @click="handleToggleSidebar"
              >
                {{ sidebarCollapsed ? '☰' : '✕' }}
              </button>
            </slot>
          </template>
          <slot name="header" />
        </LayoutHeader>
        <LayoutTabbar v-if="tabbarEnable" :height="tabbarHeight">
          <slot name="tabbar" />
        </LayoutTabbar>
      </div>

      <LayoutContent
        :padding="contentPadding"
        :compact="contentCompact"
        :compact-width="contentCompactWidth"
        :style="contentWrapStyle"
        class="core-layout__content-wrap"
      >
        <template #overlay>
          <slot name="content-overlay" />
        </template>
        <slot name="content" />
      </LayoutContent>

      <LayoutFooter
        v-if="footerEnable"
        :height="footerHeight"
        :fixed="footerFixed"
        :show="true"
      >
        <slot name="footer" />
      </LayoutFooter>
    </div>

    <div
      v-if="maskVisible"
      class="core-layout__mask"
      :style="{ zIndex: zIndex - 1 }"
      aria-hidden="true"
      @click="handleMaskClick"
    />
  </div>
</template>

<style src="./layout-vben.css" />
<style scoped>
.core-layout {
  position: relative;
  min-height: 100%;
  width: 100%;
}
.core-layout__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100vh;
  margin-left: 0;
  transition: margin-left 0.2s;
}
.core-layout__header-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background-color: hsl(var(--header));
  transition: left 0.2s ease, width 0.2s ease;
  overflow: hidden;
}
.core-layout__content-wrap {
  flex: 1;
  min-height: 0;
}
.core-layout__toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: var(--radius);
  background: transparent;
  cursor: pointer;
  font-size: 16px;
}
.core-layout__toggle-btn:hover {
  background: hsl(var(--accent));
}
.core-layout__mask {
  position: fixed;
  inset: 0;
  background: hsl(var(--overlay));
  transition: opacity 0.2s;
}
</style>
