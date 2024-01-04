import { theme } from 'ant-design-vue'

export async function changeTheme(_color: string) {
  const { useToken } = theme

  const { token } = useToken()
  token.value.colorPrimary = _color
}
