import type { InjectionKey, Ref } from 'vue';
import type { MenuRecordRaw } from '../../base/types/menu-record';

export interface MenuContextValue {
  activePath: Ref<string>;
  openedMenus: Ref<string[]>;
  collapse: Ref<boolean>;
  theme: Ref<'light' | 'dark'>;
  mode: Ref<'vertical' | 'horizontal'>;
  handleSelect: (path: string, item: MenuRecordRaw) => void;
  handleSubMenuClick: (path: string, parentPaths: string[]) => void;
  openMenu: (path: string, parentPaths: string[]) => void;
  closeMenu: (path: string, parentPaths: string[]) => void;
}

export const MenuContextKey: InjectionKey<MenuContextValue> = Symbol('MenuContext');

export interface SubMenuContextValue {
  level: number;
  parentPaths: Ref<string[]>;
}

export const SubMenuContextKey: InjectionKey<SubMenuContextValue> = Symbol('SubMenuContext');
