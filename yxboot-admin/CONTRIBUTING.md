# 开发指南

## 环境准备

### 必需工具
- Node.js >= 20.19.0
- pnpm >= 10.0.0

### IDE 推荐
- VS Code
- 推荐安装的扩展:
  - Vue Language Features (Volar)
  - TypeScript Vue Plugin (Volar)
  - Biome
  - Tailwind CSS IntelliSense

## 项目结构

### Monorepo 架构

```
yxboot-admin/
├── apps/                    # 应用
│   └── web-antd/           # Ant Design Vue 应用
├── packages/               # 包
│   └── @core/             # 核心包
├── tooling/               # 工具配置
└── docs/                  # 文档
```

### 核心包结构

```
packages/@core/src/
├── base/                   # 基础模块
│   ├── constants/         # 常量
│   ├── types/            # 类型
│   └── utils/            # 工具函数
├── runtime/              # 运行时
│   ├── access/          # 权限
│   ├── request/         # HTTP 请求
│   └── store/           # 状态管理
├── ui/                  # UI 组件
├── composables/         # 组合式函数
└── directives/          # 自定义指令
```

## 开发流程

### 1. 克隆项目

```bash
git clone https://github.com/yxboot/yxboot-admin.git
cd yxboot-admin
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发

```bash
# 启动 Ant Design Vue 应用
pnpm dev:antd
```

### 4. 代码规范

#### 代码检查

```bash
# 检查代码
pnpm lint

# 自动修复
pnpm lint:fix
```

#### 代码格式化

```bash
pnpm format
```

#### 类型检查

```bash
pnpm typecheck
```

### 5. 提交代码

项目使用 Lefthook 管理 Git hooks，提交时会自动进行代码检查和格式化。

#### Commit 规范

```
<type>(<scope>): <subject>
```

Type 类型:
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `chore`: 构建/工具变动

示例:
```bash
git commit -m "feat(core): 添加用户权限管理模块"
git commit -m "fix(ui): 修复表格分页问题"
```

## 添加新功能

### 1. 在核心包中添加功能

```typescript
// packages/@core/src/base/utils/my-util.ts
export function myUtil() {
  // 实现
}
```

### 2. 导出功能

```typescript
// packages/@core/src/base/utils/index.ts
export * from './my-util';
```

### 3. 在应用中使用

```typescript
// apps/web-antd/src/xxx.ts
import { myUtil } from '@yxboot/core/base';
```

## 创建新应用

```bash
# 复制现有应用
cp -r apps/web-antd apps/my-app

# 修改 package.json
cd apps/my-app
# 修改 name 字段为 @yxboot/my-app

# 安装依赖
pnpm install

# 启动开发
pnpm -F @yxboot/my-app run dev
```

## 调试技巧

### 1. 使用 Vue DevTools

安装 Vue DevTools 浏览器扩展，可以查看组件树、状态等。

### 2. 使用断点调试

在 VS Code 中配置 launch.json:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/apps/web-antd"
    }
  ]
}
```

### 3. 使用 console.log

在开发环境中，可以使用 console.log 输出调试信息。

## 常见问题

### 1. pnpm install 失败

尝试清除缓存后重新安装:
```bash
pnpm clean
pnpm install
```

### 2. 类型错误

确保运行了类型检查:
```bash
pnpm typecheck
```

### 3. 构建失败

检查是否有语法错误或导入错误:
```bash
pnpm lint
pnpm typecheck
```

## 最佳实践

### 1. 命名规范

- 文件名: kebab-case (user-profile.vue)
- 组件名: PascalCase (UserProfile)
- 变量名: camelCase (userName)
- 常量: UPPER_SNAKE_CASE (API_BASE_URL)

### 2. 目录组织

按技术层级组织，而非按功能模块:

```
src/
├── api/        # API 接口
├── router/     # 路由
├── store/      # 状态
├── views/      # 页面
└── components/ # 组件
```

### 3. 类型定义

优先使用 TypeScript 类型，避免使用 any:

```typescript
// ✅ 推荐
function getData<T>(key: string): T {
  // ...
}

// ❌ 避免
function getData(key: string): any {
  // ...
}
```

### 4. 组件编写

使用 Composition API 和 `<script setup>`:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);
</script>
```

## 参考资源

- [Vue 3 文档](https://cn.vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/zh/)
- [Vite 文档](https://cn.vitejs.dev/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
