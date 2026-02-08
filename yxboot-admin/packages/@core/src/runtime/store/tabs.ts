import type { Router } from 'vue-router';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { TabDefinition } from '../../base/types/tabs';
import { getTabKey } from '../../base/types/tabs';

const TAB_KEY = 'key';

function getTabKeyFromTab(tab: TabDefinition): string {
  return (tab as any)[TAB_KEY] ?? getTabKey(tab);
}

function equalTab(a: TabDefinition, b: TabDefinition): boolean {
  return getTabKeyFromTab(a) === getTabKeyFromTab(b);
}

function isAffixTab(tab: TabDefinition): boolean {
  return !!(tab.meta as any)?.affixTab;
}

function isTabShown(tab: TabDefinition): boolean {
  const matched = tab.matched ?? [];
  return !(tab.meta as any)?.hideInTab && matched.every((m) => !(m.meta as any)?.hideInTab);
}

/**
 * 标签页 Store（简化版）
 */
export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<TabDefinition[]>([]);
  const cachedTabs = ref<Set<string>>(new Set());
  const excludeCachedTabs = ref<Set<string>>(new Set());
  const renderRouteView = ref(true);

  const getTabs = computed(() => {
    const affix = tabs.value.filter((t) => isAffixTab(t));
    const normal = tabs.value.filter((t) => !isAffixTab(t));
    return [...affix, ...normal];
  });

  const getCachedTabs = computed(() => [...cachedTabs.value]);
  const getExcludeCachedTabs = computed(() => [...excludeCachedTabs.value]);

  function addTab(routeTab: TabDefinition): TabDefinition {
    const tab = { ...routeTab, [TAB_KEY]: (routeTab as any)[TAB_KEY] ?? getTabKey(routeTab) };
    if (!isTabShown(tab)) return tab;

    const idx = tabs.value.findIndex((t) => equalTab(t, tab));
    if (idx === -1) {
      tabs.value.push(tab);
    } else {
      tabs.value[idx] = { ...tabs.value[idx], ...tab };
    }
    updateCacheTabs();
    return tab;
  }

  function _close(tab: TabDefinition) {
    if (isAffixTab(tab)) return;
    const idx = tabs.value.findIndex((t) => equalTab(t, tab));
    if (idx !== -1) tabs.value.splice(idx, 1);
    updateCacheTabs();
  }

  async function closeTab(tab: TabDefinition, router: Router) {
    const currentKey = getTabKey(router.currentRoute.value);
    const tabKey = getTabKeyFromTab(tab);
    if (currentKey !== tabKey) {
      _close(tab);
      return;
    }
    const list = getTabs.value;
    const idx = list.findIndex((t) => getTabKeyFromTab(t) === currentKey);
    const next = list[idx + 1];
    const prev = list[idx - 1];
    _close(tab);
    if (next) {
      await router.replace({ path: next.path, query: next.query ?? {} });
    } else if (prev) {
      await router.replace({ path: prev.path, query: prev.query ?? {} });
    }
  }

  async function closeAllTabs(router: Router) {
    const affix = tabs.value.filter((t) => isAffixTab(t));
    const first = tabs.value[0];
    tabs.value = affix.length > 0 ? affix : (first ? [first] : []);
    const target = getTabs.value[0];
    if (target) {
      await router.replace({
        path: target.path,
        query: target.query ?? {},
      });
    }
    updateCacheTabs();
  }

  async function closeOtherTabs(tab: TabDefinition) {
    const key = getTabKeyFromTab(tab);
    tabs.value = tabs.value.filter((t) => {
      if (isAffixTab(t)) return true;
      return getTabKeyFromTab(t) === key;
    });
    updateCacheTabs();
  }

  function getTabByKey(key: string) {
    return getTabs.value.find((t) => getTabKeyFromTab(t) === key);
  }

  function updateCacheTabs() {
    const set = new Set<string>();
    for (const tab of tabs.value) {
      const keepAlive = (tab.meta as any)?.keepAlive;
      if (!keepAlive) continue;
      (tab.matched ?? []).forEach((m, i) => {
        if (i > 0 && m.name) set.add(String(m.name));
      });
      if (tab.name) set.add(String(tab.name));
    }
    cachedTabs.value = set;
  }

  return {
    tabs,
    cachedTabs,
    excludeCachedTabs,
    renderRouteView,
    getTabs,
    getCachedTabs,
    getExcludeCachedTabs,
    addTab,
    closeTab,
    closeAllTabs,
    closeOtherTabs,
    getTabByKey,
    updateCacheTabs,
  };
});
