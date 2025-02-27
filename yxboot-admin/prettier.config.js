module.exports = {
  printWidth: 120, // 每行代码长度（默认80）
  semi: false, // 声明结尾使用分号(默认true)
  vueIndentScriptAndStyle: true,
  singleQuote: true, // 字符串使用单引号
  trailingComma: 'none', // 多行使用拖尾逗号（默认none）
  proseWrap: 'never', // 不强制（标签属性）换行，超过指定宽度后换行
  htmlWhitespaceSensitivity: 'strict',
  useTabs: false,
  endOfLine: 'auto',
  plugins: ['prettier-plugin-organize-imports']
}
