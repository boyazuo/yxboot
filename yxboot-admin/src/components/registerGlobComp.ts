import Antd from 'ant-design-vue'
import type { App } from 'vue'

export function registerGlobComp(app: App) {
  app.use(Antd)
}
