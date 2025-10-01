declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const Component: DefineComponent<Record<string, never>, Record<string, never>, any>
  export default Component
}

declare module 'virtual:*' {
  const result: any
  export default result
}
