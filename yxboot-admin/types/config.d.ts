import {
  ContentLayoutEnum,
  PermissionModeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
  ThemeEnum
} from '@/enums/appEnum'
import { CacheTypeEnum } from '@/enums/cacheEnum'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'

export interface MenuSetting {
  bgColor: string
  fixed: boolean
  show: boolean
  collapsed: boolean
  siderHidden: boolean
  split: boolean
  menuWidth: number
  mode: MenuModeEnum
  type: MenuTypeEnum
  theme: ThemeEnum
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
  // Show document button
  showDoc: boolean
  // Show message center button
  showNotice: boolean
  showSearch: boolean
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
  // Whether to open page switching loading
  openPageLoading: boolean
  // Whether to open the top progress bar
  openNProgress: boolean
}

export interface ProjectConfig {
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum
  // Whether to show the configuration button
  showSettingButton: boolean
  // Whether to show the theme switch button
  showDarkModeToggle: boolean
  // Configure where the button is displayed
  settingButtonPosition: SettingButtonPositionEnum
  // Permission mode
  permissionMode: PermissionModeEnum
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum
  // Website gray mode, open for possible mourning dates
  grayMode: boolean
  // Whether to turn on the color weak mode
  colorWeak: boolean
  // Theme color
  themeColor: string

  // The main interface is displayed in full screen, the menu is not displayed, and the top
  fullContent: boolean
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

export interface DefineAppConfigOptions {
  // Navigation bar mode
  navBarMode: NavBarModeEnum
  // Theme
  theme: ThemeEnum
  // Theme color
  themeColor: string
  // Whether to show the theme switch button
  showThemeModeToggle: boolean
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean
  // Whether to open back to top
  useOpenBackTop: boolean
  // Is it possible to embed iframe pages
  canEmbedIFramePage: boolean
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean
  closeMixSidebarOnChange: boolean
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum
  // Configure where the button is displayed
  settingButtonPosition: SettingButtonPositionEnum
  // Configuration setting drawer open
  openSettingDrawer: boolean
  // Permission mode
  permissionMode: PermissionModeEnum
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum
  // Website gray mode, open for possible mourning dates
  grayMode: boolean
  // Whether to turn on the color weak mode
  colorWeak: boolean
  // Lock screen time
  lockTime: number
  // Whether to show the lock screen
  useLockPage: boolean
  sidebar: SidebarConfigOptions
  menu: MenuConfigOptions
  header: HeaderConfigOptions
  logo: LogoConfigOptions
  tabTar: TabTbrConfigOptions
  content: ContentConfigOptions
  footer: FooterConfigOptions
  transition: TransitionConfigOptions
}

export interface SidebarConfigOptions {
  theme: ThemeEnum
  bgColor?: string
  show: boolean
  visible: boolean
  fixed: boolean
  collapsed: boolean
  width: number
  trigger: TriggerEnum
  readonly mixSidebarWidth: number
  readonly collapsedWidth: number
}
export interface MenuConfigOptions {
  show: boolean
  canDrag: boolean
  split: boolean
  mode: MenuModeEnum
  accordion: boolean
  collapsedShowTitle: boolean
  mixSideTrigger: MixSidebarTriggerEnum
  mixSideFixed: boolean
  topMenuAlign: 'start' | 'center' | 'end'

  subMenuWidth: number
  dropdownPlacement:
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end'
    | 'left-start'
    | 'left'
    | 'left-end'
}

export interface HeaderConfigOptions {
  theme: ThemeEnum
  bgColor?: string
  show: boolean
  visible: boolean
  fixed: boolean
  showFullScreen: boolean
  showDoc: boolean
  showNotice: boolean
  showSearch: boolean
  showLocalePicker: boolean
  showSetting: boolean
  readonly height: number
  // Show breadcrumbs
  showBreadCrumb: boolean
  // Show breadcrumb icon
  showBreadCrumbIcon: boolean
}

export interface LogoConfigOptions {
  show: boolean
  visible: boolean
  showTitle: boolean
}

export interface TabTbrConfigOptions {
  show: boolean
  visible: boolean
  cache: boolean
  canDrag: boolean
  showQuick: boolean
  showRedo: boolean
  showFold: boolean
  readonly height: number
}

export interface ContentConfigOptions {
  fullScreen: boolean
  mode: ContentLayoutEnum
}

export interface FooterConfigOptions {
  show: boolean
  visible: boolean
  readonly height: number
}

export interface TransitionConfigOptions {
  //  Whether to open the page switching animation
  enable: boolean
  // Route basic switching animation
  basicTransition: RouterTransitionEnum
  // Whether to open page switching loading
  openPageLoading: boolean
  // Whether to open the top progress bar
  openNProgress: boolean
}

export interface FooterLinkOptions {
  label?: string
  icon?: string
  target?: '_self' | '_blank'
  url: string
}
export interface DefineSiteGeneralOptions {
  // Logo url
  logo: string
  // Site title
  title: string
  // Copyright Information
  copyright: string
  // Footer link
  links: FooterLinkOptions[]
  // Avatar url
  avatar: string
  // username
  username: string
}
