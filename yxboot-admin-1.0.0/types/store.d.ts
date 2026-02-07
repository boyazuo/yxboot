import type { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined
  // Is it locked?
  isLock?: boolean
}

export interface UserInfo {
  userId: number
  username: string
  phone: string
  name: string
  avatar: string
  email: string
}

export interface BeforeMiniState {
  menuCollapsed?: boolean
  menuSplit?: boolean
  menuMode?: MenuModeEnum
  menuType?: MenuTypeEnum
}

export interface TableSetting {
  size: Recordable<Nullable<SizeType>>
  showIndexColumn: Recordable<Nullable<boolean>>
  columns: Recordable<Nullable<Array<ColumnOptionsType>>>
  showRowSelection: Recordable<Nullable<boolean>>
}
