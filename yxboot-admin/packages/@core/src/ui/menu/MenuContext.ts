import type { InjectionKey, Ref } from 'vue';

export interface MenuContextValue {
  activePath: Ref<string>;
  openedMenus: Ref<string[]>;
  collapse: Ref<boolean>;
  theme: Ref<'light' | 'dark'>;
  handleSelect: (path: string, parentPaths: string[]) => void;
  handleSubMenuClick: (path: string, parentPaths: string[]) => void;
  openMenu: (path: string, parentPaths: string[]) => void;
  closeMenu: (path: string, parentPaths: string[]) => void;
}

export const MenuContextKey: InjectionKey<MenuContextValue> = Symbol('MenuContext');
