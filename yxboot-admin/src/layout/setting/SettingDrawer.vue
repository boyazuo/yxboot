<template>
  <BasicDrawer title="项目配置" :show-footer="false" @register="register" width="320" :bodyStyle="{ padding: '16px' }">
    <a-divider orientation="left">系统主题</a-divider>
    <ThemeColorPicker
      :colorList="APP_PRESET_COLOR_LIST"
      :event="HandlerEnum.CHANGE_THEME_COLOR"
      :def="getPrimaryColor"
    />

    <a-divider orientation="left">整体风格设置</a-divider>
    <TypePicker :typeList="themeTypeList" :handler="themeTypeHandler" :def="getThemeType" />

    <a-divider orientation="left">导航模式</a-divider>
    <TypePicker :typeList="menuTypeList" :handler="menuTypeHandler" :def="getMenuType" />

    <a-divider orientation="left">界面布局</a-divider>
    <SelectItem
      title="内容区域宽度"
      :event="HandlerEnum.CONTENT_MODE"
      :def="getContentMode"
      :options="contentModeOptions"
    />
    <SwitchItem title="固定Header" :event="HandlerEnum.HEADER_FIXED" :def="getHeaderFixed" />
    <SwitchItem title="固定Sidebar" :event="HandlerEnum.SIDER_FIXED" :def="getFixed" :disabled="!isTopMenuType" />

    <a-divider orientation="left">界面显示</a-divider>
    <SwitchItem
      title="面包屑"
      :event="HandlerEnum.SHOW_BREADCRUMB"
      :def="isSidebarType ? getShowBreadCrumb : false"
      :disabled="!isSidebarType"
    />
    <SwitchItem
      title="面包屑图标"
      :event="HandlerEnum.SHOW_BREADCRUMB_ICON"
      :def="isSidebarType ? getShowBreadCrumbIcon : false"
      :disabled="!isSidebarType"
    />
    <SwitchItem title="标签页" :event="HandlerEnum.TABS_SHOW" :def="getShowMultipleTab" />
    <SwitchItem
      title="标签页快捷按钮"
      :event="HandlerEnum.TABS_SHOW_QUICK"
      :def="getShowQuick"
      :disabled="!getShowMultipleTab"
    />
    <SwitchItem
      title="标签页刷新按钮"
      :event="HandlerEnum.TABS_SHOW_REDO"
      :def="getShowRedo"
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
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer'
  import { HandlerEnum, contentModeOptions, menuTypeList, themeTypeList } from '@/enums/handlerEnum'
  import { useAppConfig } from '@/hooks/config/useAppConfig'
  import {
    useHeaderSetting,
    useMenuSetting,
    useMultipleTabSetting,
    useProjectSetting,
    useSiderSetting,
    useThemeSetting
  } from '@/hooks/setting'
  import { APP_PRESET_COLOR_LIST } from '@/settings/designSetting'
  import SelectItem from './components/SelectItem.vue'
  import SwitchItem from './components/SwitchItem.vue'
  import ThemeColorPicker from './components/ThemeColorPicker.vue'
  import TypePicker from './components/TypePicker.vue'

  const { getMenuType, isSidebarType, isTopMenuType } = useMenuSetting()
  const { getFixed } = useSiderSetting()

  const { getShowMultipleTab, getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting()
  const { getFixed: getHeaderFixed } = useHeaderSetting()
  const { getContentMode, getShowBreadCrumb, getShowBreadCrumbIcon, getShowLogo, getShowFooter } = useProjectSetting()
  const { getThemeType, getPrimaryColor } = useThemeSetting()

  const [register] = useDrawerInner()

  const { baseHandler } = useAppConfig()

  const themeTypeHandler = (item) => {
    baseHandler(HandlerEnum.CHANGE_THEME, item.type)
  }

  const menuTypeHandler = (item) => {
    baseHandler(HandlerEnum.CHANGE_LAYOUT, item.type)
  }
</script>
