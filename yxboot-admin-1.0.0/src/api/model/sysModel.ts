import type { StatusEnum } from '@/enums/statusEnum'

export interface SysMenu {
  menuId: number
  name: string
  descn: string
  code: string
  type: number
  icon: string
  path: string
  component: string
  parentId: number
  display: number
  sort: number
  status: StatusEnum
  children: Array<SysMenu>
}
