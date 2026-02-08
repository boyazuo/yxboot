/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE: string;
  readonly VITE_ROUTER_HISTORY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
