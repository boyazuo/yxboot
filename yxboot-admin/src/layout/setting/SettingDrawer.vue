<template>
  <BasicDrawer title="项目配置" :show-footer="false" @register="register" width="320" :bodyStyle="{ padding: '16px' }">
    <a-divider orientation="left">主题</a-divider>
    <AppDarkModeToggle class="mx-auto" />

    <a-divider orientation="left">系统主题</a-divider>
    <ThemeColorPicker :colorList="APP_PRESET_COLOR_LIST" :event="HandlerEnum.CHANGE_THEME_COLOR" :def="getThemeColor" />

    <a-divider orientation="left">顶栏主题</a-divider>
    <ThemeColorPicker
      :colorList="HEADER_PRESET_BG_COLOR_LIST"
      :event="HandlerEnum.HEADER_THEME"
      :def="getHeaderBgColor"
    />

    <a-divider orientation="left">侧栏主题</a-divider>
    <ThemeColorPicker :colorList="SIDE_BAR_BG_COLOR_LIST" :event="HandlerEnum.MENU_THEME" :def="getMenuBgColor" />

    <a-divider orientation="left">导航模式</a-divider>
    <TypePicker :menuTypeList="menuTypeList" :handler="menuTypeHandler" :def="getMenuType" />
    <SelectItem
      title="内容区域宽度"
      :event="HandlerEnum.CONTENT_MODE"
      :def="getContentMode"
      :options="contentModeOptions"
    />
    <SwitchItem title="固定Header" :event="HandlerEnum.HEADER_FIXED" :def="getHeaderFixed" />
    <SwitchItem title="固定Sidebar" :event="HandlerEnum.MENU_FIXED" :def="getMenuFixed" :disabled="isTopMenuType" />
    <SwitchItem title="自动分割菜单" :event="HandlerEnum.MENU_SPLIT" :def="getSplit" :disabled="!isMixType" />

    <a-divider orientation="left">界面显示</a-divider>
    <SwitchItem title="面包屑" :event="HandlerEnum.SHOW_BREADCRUMB" :def="getShowBreadCrumb" />
    <SwitchItem title="面包屑图标" :event="HandlerEnum.SHOW_BREADCRUMB_ICON" :def="getShowBreadCrumbIcon" />
    <SwitchItem title="标签页" :event="HandlerEnum.TABS_SHOW" :def="getShowMultipleTab" />
    <SwitchItem
      title="标签页刷新按钮"
      :event="HandlerEnum.TABS_SHOW_REDO"
      :def="getShowRedo"
      :disabled="!getShowMultipleTab"
    />
    <SwitchItem
      title="标签页快捷按钮"
      :event="HandlerEnum.TABS_SHOW_QUICK"
      :def="getShowQuick"
      :disabled="!getShowMultipleTab"
    />
    <SwitchItem
      title="标签页折叠按钮"
      :event="HandlerEnum.TABS_SHOW_FOLD"
      :def="getShowFold"
      :disabled="!getShowMultipleTab"
    />
    <SwitchItem title="Logo" :event="HandlerEnum.SHOW_LOGO" :def="getShowLogo" />
    <SwitchItem title="页脚" :event="HandlerEnum.SHOW_FOOTER" :def="getShowFooter" />
    <SwitchItem title="色弱模式" :event="HandlerEnum.COLOR_WEAK" :def="getColorWeak" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer'
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'
  import { useRootSetting } from '@/hooks/setting/useRootSetting'
  import { APP_PRESET_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST, SIDE_BAR_BG_COLOR_LIST } from '@/settings/designSetting'
  import AppDarkModeToggle from './components/AppDarkModeToggle.vue'
  import SelectItem from './components/SelectItem.vue'
  import SwitchItem from './components/SwitchItem.vue'
  import ThemeColorPicker from './components/ThemeColorPicker.vue'
  import TypePicker from './components/TypePicker.vue'
  import { HandlerEnum, contentModeOptions, menuTypeList } from './enum'
  import { baseHandler } from './handler'

  const { getMenuType, getMenuFixed, getSplit, isTopMenuType, isMixType, getMenuBgColor } = useMenuSetting()
  const { getShowMultipleTab, getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting()
  const { getHeaderBgColor, getFixed: getHeaderFixed } = useHeaderSetting()
  const {
    getContentMode,
    getThemeColor,
    getShowBreadCrumb,
    getShowBreadCrumbIcon,
    getShowLogo,
    getShowFooter,
    getColorWeak
  } = useRootSetting()

  const [register] = useDrawerInner()

  const menuTypeHandler = (item) => {
    baseHandler(HandlerEnum.CHANGE_LAYOUT, {
      mode: item.mode,
      type: item.type
    })
  }
</script>
