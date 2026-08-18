# Changelog

本仓库为 [Zhenyu98/dsh-context-doctor](https://github.com/Zhenyu98/dsh-context-doctor) 的个人 fork
（[lilyblessing/dsh-context-doctor](https://github.com/lilyblessing/dsh-context-doctor)）。
除上游功能外，自 0.5.2 起包含下列修复与改进。格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

## [0.5.2] - 2026-08-15

聚合了 2026-08-14 ~ 08-15 的 7 个提交（`b790ddb` … `0f98779`）：修复打包导致的工具调度崩溃、
补齐配置 / 插槽契约、补中文面板，并让审计结果对齐「模型真实可见」的 agent 视图。

### 修复 — 构建 / 打包
- **修复 tsdown 内联 dsh-tools 导致的工具调度崩溃**：node 半区构建保持全部 `@deepseek-ai/*`
  external，避免 bundle 内产生第二个 `TOOL_RUNTIME_SCHEDULER` Symbol（`#1`，`b790ddb` / `47fbe42`）。
- **peerDependencies 声明 `@deepseek-ai/dsh-tools`**（`#3`，`e0eade8`），随后收敛：移除多余 peer、
  补全 `exports["./cordis.patch.yml"]`（`9934e54`）。

### 修复 — 配置 / UI 契约
- **`Config` 补 Schemastery schema**（此前仅 interface，官方 config 要求）。
- **`slots.register` 补 `id`**；**UI 注册到 `conversation.input.left`**——
  `conversation.input.context` 在 DSH rc.5/rc.6 不存在，面板此前永不渲染（`#4`，`acb47da`）。

### 功能
- **真中文 locale（i18n）**：审计面板文案跟随 DSH 界面语言（`5fd9d26`）。

### 审计正确性
- **agent scope**：`skills.list`/`skills.get` 与 HTTP 路由按 agent 解析 scope，技能 / MCP 统计
  与「模型真实可见」一致（此前全局层漏统计）（`0f98779`）。

### 已知兼容
- 面板要求 DSH `conversation.input.left` 插槽（0.1.0-rc.5+）；无该插槽的环境仍可用 `context_audit` 工具。

[0.5.2]: https://github.com/lilyblessing/dsh-context-doctor/compare/main...HEAD
