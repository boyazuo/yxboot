/**
 * 弹窗 Hook：可配合 createModalApi + Modal.vue 使用
 */
import type { ModalApi } from '../modal/types';
import type { DrawerApi, DrawerOptions } from '../modal/types';
import { createModalApi } from '../modal/ModalApi';

/** 全局 ModalApi 实例（应用层可调用 createModalApi 并 register） */
let modalApiInstance: ReturnType<typeof createModalApi> | null = null;

export function registerModalApi(api: ReturnType<typeof createModalApi>) {
  modalApiInstance = api;
}

export function useModal(): ModalApi & { state: ReturnType<typeof createModalApi>['state'] } {
  if (!modalApiInstance) {
    const fallback = createModalApi();
    return {
      ...fallback,
      open: fallback.open,
      close: fallback.close,
      confirm: fallback.confirm,
      state: fallback.state,
    };
  }
  return {
    open: modalApiInstance.open,
    close: modalApiInstance.close,
    confirm: modalApiInstance.confirm,
    state: modalApiInstance.state,
  };
}

/** Drawer 同理 */
let drawerApiInstance: DrawerApi | null = null;

export function registerDrawerApi(api: DrawerApi) {
  drawerApiInstance = api;
}

export function useDrawer(): DrawerApi {
  if (!drawerApiInstance) {
    return {
      open: (_opts: DrawerOptions) => {
        console.warn('[@yxboot/core] useDrawer: 未注册 DrawerApi，请在应用层通过 registerDrawerApi 注入');
      },
      close: () => {},
    };
  }
  return drawerApiInstance;
}
