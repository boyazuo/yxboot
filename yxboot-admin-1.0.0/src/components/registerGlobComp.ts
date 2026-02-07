import Antd from 'ant-design-vue'
import type { App } from 'vue'
import { Button } from './Button'

export function registerGlobComp(app: App) {
  app.use(Antd).use(Button)
}
