<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Layout, Menu, Tabs, Icon } from "@yxboot/core/ui";
import {
	usePreferences,
	usePermissionStore,
	useTabsStore,
	useUserStore,
	getTabKey,
} from "@yxboot/core";
import { useAuthStore } from "@/store";
import { appName } from "@/preferences";
import { getMenuIcon } from "@/constants";

const route = useRoute();
const router = useRouter();
const {
	preferences,
	sidebarCollapsed,
	updatePreferences,
	isMobile,
	theme,
} = usePreferences();
const permissionStore = usePermissionStore();
const tabsStore = useTabsStore();
const userStore = useUserStore();
const authStore = useAuthStore();

const menus = computed(() => permissionStore.accessMenus);
const tabs = computed(() =>
	tabsStore.getTabs.map((tab) => ({
		...tab,
		meta: { ...tab.meta, icon: getMenuIcon((tab.meta as any)?.icon) },
	})),
);
const activeTabKey = computed(() => getTabKey(route));

// 同步当前路由到 tabs
watch(
	() => ({
		path: route.path,
		fullPath: route.fullPath,
		name: route.name,
		meta: route.meta,
	}),
	() => {
		if (route.meta?.hideInTab) return;
		tabsStore.addTab({
			path: route.path,
			fullPath: route.fullPath,
			name: route.name,
			meta: route.meta,
			query: route.query as Record<string, string | string[]>,
			params: route.params as Record<string, string>,
			matched: route.matched,
		});
	},
	{ immediate: true },
);

function handleMenuSelect(path: string) {
	router.push(path);
}

function handleTabClose(key: string) {
	tabsStore.closeTab(tabsStore.getTabByKey(key)!, router);
}

function handleTabSelect(key: string) {
	const tab = tabsStore.getTabByKey(key);
	if (tab?.path) router.push({ path: tab.path, query: tab.query });
}

async function handleLogout() {
	await authStore.logout(true);
}

function handleSidebarCollapsedChange(value: boolean) {
	updatePreferences({ sidebar: { collapsed: value } });
}

function handleToggleSidebar() {
	updatePreferences({ sidebar: { collapsed: !sidebarCollapsed } });
}

/** 菜单项图标：使用 ep 集或映射，避免未加载图标显示为方块 */
function menuItemIcon(item: { icon?: unknown }) {
	return getMenuIcon(item?.icon);
}
</script>

<template>
  <Layout
    :sidebar-collapsed="sidebarCollapsed"
    :sidebar-width="preferences.sidebar.width"
    :sidebar-collapsed-width="preferences.sidebar.collapseWidth"
    :sidebar-theme="theme"
    :header-theme="theme"
    :sidebar-show-collapse-button="preferences.sidebar.collapsedButton"
    :header-height="preferences.header.height"
    :header-visible="preferences.header.enable"
    :tabbar-enable="preferences.tabbar.enable"
    :tabbar-height="preferences.tabbar.height"
    :footer-enable="preferences.footer.enable"
    :footer-height="preferences.footer.height"
    :footer-fixed="preferences.footer.fixed"
    :content-padding="preferences.app.contentPadding"
    :content-compact="preferences.app.contentCompact"
    :content-compact-width="preferences.app.contentCompactWidth"
    :is-mobile="isMobile"
    :z-index="preferences.app.zIndex"
    @update:sidebar-collapsed="handleSidebarCollapsedChange"
  >
    <template #logo>
      <router-link
        to="/"
        class="layout-logo layout-logo--sidebar flex h-full items-center gap-2 overflow-hidden px-3 text-lg leading-normal transition-all duration-300"
      >
        <img
          src="/logo.png"
          :alt="appName"
          class="h-8 w-8 flex-shrink-0 object-contain"
        />
        <span
          v-if="!sidebarCollapsed"
          class="truncate text-nowrap font-semibold"
        >
          {{ appName }}
        </span>
      </router-link>
    </template>
    <template #header-logo>
      <router-link
        to="/"
        class="layout-logo layout-logo--header flex h-full items-center gap-2 overflow-hidden px-3 text-lg leading-normal transition-all duration-300"
      >
        <img
          src="/logo.png"
          :alt="appName"
          class="h-8 w-8 flex-shrink-0 object-contain"
        />
        <span class="truncate text-nowrap font-semibold text-foreground">
          {{ appName }}
        </span>
      </router-link>
    </template>
    <template #menu>
      <Menu
        :items="menus"
        :active-key="activeTabKey"
        :collapse="sidebarCollapsed"
        :theme="theme"
        accordion
        @select="handleMenuSelect"
      >
        <template #icon="{ item }">
          <Icon
            :icon="menuItemIcon(item)"
            :size="16"
          />
        </template>
        <template #title="{ item }">{{ item.name }}</template>
      </Menu>
    </template>
    <template #header-toggle>
      <button
        type="button"
        class="my-0 mr-1 flex items-center justify-center rounded-md p-1 hover:bg-accent"
        aria-label="折叠菜单"
        @click="handleToggleSidebar"
      >
        <Icon v-if="sidebarCollapsed" icon="ep:expand" :size="18" />
        <Icon v-else icon="ep:fold" :size="18" />
      </button>
    </template>
    <template #header>
      <div class="flex flex-1 items-center justify-end gap-2">
        <span class="text-sm text-foreground">{{ userStore.userInfo?.realName ?? userStore.userInfo?.username }}</span>
        <button
          type="button"
          class="rounded px-2 py-1 text-sm hover:bg-accent"
          @click="router.push('/profile')"
        >
          个人中心
        </button>
        <button
          type="button"
          class="rounded px-2 py-1 text-sm hover:bg-accent"
          @click="handleLogout"
        >
          退出
        </button>
      </div>
    </template>
    <template #tabbar>
      <Tabs
        :tabs="tabs"
        :active="activeTabKey"
        @update:active="handleTabSelect"
        @close="handleTabClose"
      />
    </template>
    <template #content>
      <RouterView v-slot="{ Component }">
        <KeepAlive :include="(tabsStore.getCachedTabs as string[])">
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </template>
  </Layout>
</template>
