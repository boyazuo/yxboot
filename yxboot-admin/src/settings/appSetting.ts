import type { AppSetting } from '#/config'
import { ContentLayoutEnum, RouterTransitionEnum, SettingButtonPositionEnum, ThemeEnum, ThemeTypeEnum } from '@/enums/appEnum'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'

const setting: AppSetting = {
  themeSetting: {
    theme: ThemeEnum.LIGHT,
    themeType: ThemeTypeEnum.DARK,
    borderRadius: 4,
    primaryColor: '#1677ff',
    successColor: '#52c41a',
    warningColor: '#faad14',
    errorColor: '#ff4d4f',
    infoColor: '#1677ff',
  },

  // Project configuration
  projectSetting: {
    // Whether to show the configuration button
    showSettingButton: true,
    // `Settings` button position
    settingButtonPosition: SettingButtonPositionEnum.AUTO,
    // content mode
    contentMode: ContentLayoutEnum.FULL,
    // Whether to display the logo
    showLogo: true,
    // Whether to show footer
    showFooter: false,
    // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
    openKeepAlive: true,
    // Automatic screen lock time, 0 does not lock the screen. Unit minute default 0
    lockTime: 0,
    // Whether to show breadcrumbs
    showBreadCrumb: true,
    // Whether to show the breadcrumb icon
    showBreadCrumbIcon: false,
    // Use error-handler-plugin
    useErrorHandle: false,
    // Whether to open back to top
    useOpenBackTop: true,
    //  Is it possible to embed iframe pages
    canEmbedIFramePage: true,
    // Whether to delete unclosed messages and notify when switching the interface
    closeMessageOnSwitch: true,
    // Whether to cancel the http request that has been sent but not responded when switching the interface.
    // If it is enabled, I want to overwrite a single interface. Can be set in a separate interface
    removeAllHttpPending: false,
  },

  // Sider Configuration
  siderSetting: {
    theme: ThemeEnum.DARK,
    fixed: false,
    show: true,
    width: 210,
    mixSidebarWidth: 80,
    collapsedWidth: 48,
    collapsed: false,
  },

  // Header configuration
  headerSetting: {
    // Fixed at the top
    fixed: true,
    // Whether to show top
    show: true,
    // theme
    theme: ThemeEnum.LIGHT,
    // Whether to enable the lock screen function
    useLockPage: true,
    // Whether to show the full screen button
    showFullScreen: true,
  },

  // Menu configuration
  menuSetting: {
    // Menu mode
    mode: MenuModeEnum.INLINE,
    // Menu type
    type: MenuTypeEnum.SIDER,
    // Split menu
    split: false,
  },

  // Multi-label
  multiTabsSetting: {
    cache: false,
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    canDrag: true,
    // Turn on quick actions
    showQuick: true,
    // Whether to show the refresh button
    showRedo: true,
    // Whether to show the collapse button
    showFold: true,
  },

  // Transition Setting
  transitionSetting: {
    //  Whether to open the page switching animation
    // The disabled state will also disable pageLoading
    enable: true,
    // Route basic switching animation
    basicTransition: RouterTransitionEnum.FADE_SIDE,
    // Whether to open the top progress bar
    openNProgress: false,
  },
}

export default setting
