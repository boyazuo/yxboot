# 安装问题解决方案

## 🐛 遇到的问题

在运行 `pnpm install` 时遇到以下错误：

```
Error: core.hooksPath is set locally to '.husky/_'

hint:    Unset it:
hint:        git config --unset-all --local core.hooksPath
```

## 🔍 问题原因

项目之前使用了 **husky** 管理 Git hooks，而现在改用 **lefthook**。Git 本地配置中仍保留了 husky 的 hooks 路径设置，导致 lefthook 安装失败。

## ✅ 解决步骤

### 1. 清除旧的 Git hooks 配置

```bash
cd /Users/boya/Projects/yxboot/yxboot-admin
git config --unset-all --local core.hooksPath
```

### 2. 重新安装依赖

```bash
pnpm install
```

## 📋 验证结果

安装成功后的输出：

```
✅ Config not found, creating...
✅ Added config: /Users/boya/Projects/yxboot/lefthook.yml
✅ sync hooks: ✔️ 
✅ Done in 7.1s using pnpm v10.28.2
```

## 🎯 关键点说明

### Husky vs Lefthook

| 特性 | Husky | Lefthook |
|------|-------|----------|
| 语言 | JavaScript | Go |
| 性能 | 较慢 | 极快 |
| 配置 | 复杂 | 简单 |
| 并行执行 | 不支持 | 支持 |

### 为什么选择 Lefthook？

1. **性能更好** - 使用 Go 编写，执行速度快
2. **配置简单** - 单一 YAML 配置文件
3. **并行执行** - 支持并行运行多个 hooks
4. **跨平台** - 更好的跨平台支持
5. **零依赖** - 不需要 Node.js 环境

## 📝 Lefthook 配置

项目已配置的 hooks（见 `lefthook.yml`）：

### pre-commit（提交前）
- **biome**: 检查和格式化 JS/TS/JSON 文件
- 自动修复代码问题

### post-merge（合并后）
- **install**: 自动运行 `pnpm install` 更新依赖

### commit-msg（提交信息）
- **commit-format**: 验证提交信息格式
- 要求格式：`<type>(<scope>): <subject>`
- 支持的类型：feat, fix, docs, style, refactor, perf, test, chore

## 🚀 后续操作

现在你可以：

### 1. 启动开发服务器

```bash
pnpm dev:antd
```

### 2. 验证 Git hooks

```bash
# 创建一个测试提交
git add .
git commit -m "feat: 测试提交"
```

Lefthook 会自动：
- ✅ 格式化你的代码
- ✅ 检查代码质量
- ✅ 验证提交信息格式

### 3. 查看可用命令

```bash
pnpm run
```

## 💡 提示

### 如果再次遇到类似问题

1. 检查是否有其他 Git hooks 工具残留
2. 清除所有 hooks 相关配置：
   ```bash
   git config --unset-all --local core.hooksPath
   rm -rf .husky
   ```
3. 重新安装 lefthook：
   ```bash
   pnpm prepare
   ```

### 跳过 hooks（不推荐）

如果需要临时跳过 hooks：

```bash
# 跳过 pre-commit hooks
LEFTHOOK=0 git commit -m "message"

# 或使用 --no-verify
git commit --no-verify -m "message"
```

⚠️ **注意**：不建议经常跳过 hooks，这会降低代码质量。

## 📚 相关文档

- [Lefthook 官方文档](https://github.com/evilmartians/lefthook)
- [项目 lefthook.yml 配置](./lefthook.yml)
- [Biome 官方文档](https://biomejs.dev/)

---

**问题状态**: ✅ 已解决  
**解决时间**: 2026-02-07  
**影响范围**: Git hooks 配置
