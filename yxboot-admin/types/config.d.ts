import { ContentLayoutEnum, RouterTransitionEnum, SettingButtonPositionEnum, ThemeEnum } from '@/enums/appEnum'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'

export interface SelectorType {
  title: string
  type: ThemeTypeEnum | MenuTypeEnum | string
}

export interface ThemeSetting {
  theme: string
  themeType: string
  borderRadius: number
  primaryColor: string
  successColor: string
  warningColor: string
  errorColor: string
  infoColor: string
}

export interface SiderSetting {
  theme: ThemeEnum
  fixed: boolean
  show: boolean
  width: number
  mixSidebarWidth: number
  collapsedWidth: number
  collapsed: boolean
}

export interface MenuSetting {
  mode: MenuModeEnum
  type: MenuTypeEnum
  split: boolean
}

export interface MultiTabsSetting {
  cache: boolean
  show: boolean
  showQuick: boolean
  canDrag: boolean
  showRedo: boolean
  showFold: boolean
}

export interface HeaderSetting {
  bgColor: string
  fixed: boolean
  show: boolean
  theme: ThemeEnum
  // Turn on full screen
  showFullScreen: boolean
  // Whether to show the lock screen
  useLockPage: boolean
}

export interface LocaleSetting {
  showPicker: boolean
  // Current language
  locale: LocaleType
  // default language
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
}

export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean
  // Route basic switching animation
  basicTransition: RouterTransitionEnum
  // Whether to open the top progress bar
  openNProgress: boolean
}

export interface ProjectConfig {
  // Whether to show the configuration button
  showSettingButton: boolean
  // Configure where the button is displayed
  settingButtonPosition: SettingButtonPositionEnum
  // Theme color
  themeColor: string
  // content width
  contentMode: ContentLayoutEnum
  // Whether to display the logo
  showLogo: boolean
  // Whether to show the global footer
  showFooter: boolean
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting
  // menuSetting
  menuSetting: MenuSetting
  // Multi-tab settings
  multiTabsSetting: MultiTabsSetting
  // Animation configuration
  transitionSetting: TransitionSetting
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean
  // Lock screen time
  lockTime: number
  // Show breadcrumbs
  showBreadCrumb: boolean
  // Show breadcrumb icon
  showBreadCrumbIcon: boolean
  // Use error-handler-plugin
  useErrorHandle: boolean
  // Whether to open back to top
  useOpenBackTop: boolean
  // Is it possible to embed iframe pages
  canEmbedIFramePage: boolean
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean
}

export interface ProjectSetting {
  // Whether to show the configuration button
  showSettingButton: boolean
  // Configure where the button is displayed
  settingButtonPosition: SettingButtonPositionEnum
  // Theme color
  themeColor: string
  // content width
  contentMode: ContentLayoutEnum
  // Whether to display the logo
  showLogo: boolean
  // Whether to show the global footer
  showFooter: boolean
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting
  // menuSetting
  menuSetting: MenuSetting
  // Multi-tab settings
  multiTabsSetting: MultiTabsSetting
  // Animation configuration
  transitionSetting: TransitionSetting
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean
  // Lock screen time
  lockTime: number
  // Show breadcrumbs
  showBreadCrumb: boolean
  // Show breadcrumb icon
  showBreadCrumbIcon: boolean
  // Use error-handler-plugin
  useErrorHandle: boolean
  // Whether to open back to top
  useOpenBackTop: boolean
  // Is it possible to embed iframe pages
  canEmbedIFramePage: boolean
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean
}

export interface AppSetting {
  // Theme configuration
  themeSetting: ThemeSetting
  // Project configuration
  projectSetting: ProjectSetting
  // Sider configuration
  siderSetting: SiderSetting
  // Header configuration
  headerSetting: HeaderSetting
  // Menu configuration
  menuSetting: MenuSetting
  // Multi-tab configuration
  multiTabsSetting: MultiTabsSetting
  // Transition configuration
  transitionSetting: TransitionSetting
}

export interface GlobConfig {
  // Site title
  title: string
  // Service interface url
  apiUrl: string
  // Upload url
  uploadUrl?: string
  //  Service interface url prefix
  urlPrefix?: string
  // Project abbreviation
  shortName: string
}
export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string
  // Service interface url
  VITE_GLOB_API_URL: string
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string
}
