# @yxboot/core

YXBoot Admin 核心框架包。

## 特性

- 🎯 TypeScript 完整类型支持
- 🔄 UI 库无关设计
- 🎨 Tailwind CSS 样式支持
- 📦 按需导入
- 🔌 插件化架构

## 安装

```bash
pnpm add @yxboot/core
```

## 使用

```typescript
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter } from 'vue-router';
import '@yxboot/core/styles';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
```

## 子路径导出

- `@yxboot/core/base` - 基础工具和类型
- `@yxboot/core/runtime` - 运行时核心（权限、请求、Store等）
- `@yxboot/core/ui` - UI 组件
- `@yxboot/core/composables` - 组合式函数
- `@yxboot/core/directives` - 自定义指令
- `@yxboot/core/styles` - 样式文件

## 许可证

MIT
