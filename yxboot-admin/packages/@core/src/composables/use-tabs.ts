import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTabsStore } from '../runtime/store/tabs';
import { getTabKey } from '../base/types/tabs';
import type { TabDefinition } from '../base/types/tabs';

export function useTabs() {
  const route = useRoute();
  const router = useRouter();
  const tabsStore = useTabsStore();

  const tabs = computed(() => tabsStore.getTabs);
  const activeTab = computed(() => {
    const key = getTabKey(route);
    return tabsStore.getTabByKey(key) ?? null;
  });
  const cachedTabs = computed(() => tabsStore.getCachedTabs);

  function addTab(tab?: TabDefinition) {
    const t = tab ?? {
      path: route.path,
      fullPath: route.fullPath,
      name: route.name,
      meta: route.meta,
      query: route.query,
      params: route.params,
      matched: route.matched,
    };
    return tabsStore.addTab(t as TabDefinition);
  }

  function closeTab(tab: TabDefinition) {
    return tabsStore.closeTab(tab, router);
  }

  function closeAllTabs() {
    return tabsStore.closeAllTabs(router);
  }

  function closeOtherTabs(tab: TabDefinition) {
    return tabsStore.closeOtherTabs(tab);
  }

  return {
    tabs,
    activeTab,
    cachedTabs,
    addTab,
    closeTab,
    closeAllTabs,
    closeOtherTabs,
  };
}
