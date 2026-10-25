# 移动端代码删除方案书（Windows-only 分支）

> 目标：删除 Expo 移动端及其全部关联实现，**保留 macOS/Linux 桌面端代码与全部远程主机能力**，以维持与上游的可持续同步。
> 状态：**已执行完毕**（见第 7 节执行记录）。
>
> 配套文档：[`i18n-zh-plan.md`](./i18n-zh-plan.md)（汉化方案）。顺序见第 6 节。

## 1. 决策：为什么只删移动端

原始调查覆盖了"删除全部 macOS/Linux 代码"这一更大的范围（可整文件删除约 4,900 行 Rust + 3,500 行前端；另有 156 处 `cfg` 分支与 186 处 `target_os` 需就地删改）。评估后**放弃该范围**，原因如下。

| 维度 | 全量删除 | 只删移动端（已采纳） |
| --- | --- | --- |
| 对 Windows 版的价值 | 略减体积 | 同样消除无价值代码，且移动端是体积最大的一块 |
| 与上游同步 | 差异覆盖 150+ 文件，`git merge` 基本不可用 | 只触碰移动端文件，provider 适配器等活跃代码保持原样 |
| 可吸收上游修复 | 否 | **是**（尤其 `integrations/harness/providers/` 的协议修复，是本仓库最活跃的部分） |
| 误删风险 | 高（`tray.rs`、`windows.rs` 等名字有迷惑性） | 低（移动端是独立命名空间） |
| 工作量 | 约 8 人日 | 约 0.5 人日 |

**关键理由**：删除 156 处 `cfg` 分支后，与 upstream 的差异会让后续任何 `git merge` 变成手工重写。保留跨平台代码的成本只是"读代码时多扫几行"，收益是**能持续吸收上游的 provider 协议修复**——这正是本仓库演进最快、且与汉化零冲突的部分。

## 2. 已删除范围（精确清单）

### 2.1 仓库级目录

| 路径 | 规模 | 依据 |
| --- | --- | --- |
| `mobile/` | 约 23,001 行 | Expo/React Native 应用，含独立 `package.json`、`package-lock.json`、`AGENTS.md`、`CLAUDE.md`、`modules/monocode-link`、`plugins/`、`scripts/` |
| `crates/mobile-link/` | 2,723 行 | Rust QUIC + mTLS 传输库，仅被 `mobile_access.rs` / `mobile_router.rs` 使用 |
| `tests/mobile/watchFrames.test.ts` | 113 行 | 仅由 `mobile/vitest.config.ts` 收集 |

### 2.2 前端

| 路径 | 行数 | 依据 |
| --- | --- | --- |
| `src/features/mobile/` | 3,395 行 / 18 文件 | 手机配对、工作区、会话镜像、附件、账号、通知订阅 |
| ├ `hooks/useMobileWorkspace.ts` + test | 570 | 手机命令轮询与分发 |
| ├ `model/mobileWorkspace.ts` | 678 | 手机侧会话构造与选项映射 |
| ├ `model/mobileTranscript.ts` + test | 545 | 会话块裁剪与增量推送 |
| ├ `model/mobileHighlight.ts` + test | 304 | 代码块高亮预计算 |
| ├ `model/mobileWatch.ts` + test | 230 | 工作区变更订阅 |
| ├ `model/mobileAttachments.ts` + test | 77 | 附件转存 |
| ├ `model/mobileAccountUsage.ts` + test | 233 | 账号用量 |
| ├ `model/mobileProviderAccounts.ts` + test | 165 | Provider 账号 |
| ├ `ui/MobileSettings.tsx` + test | 427 | 设置页「连接的手机」面板 |
| └ `ui/PairPhoneDialog.tsx` | 166 | 配对二维码对话框 |
| `quick-composer.html` / `mono-chat.html` | — | **未删**，与移动端无关（见 3 节） |

### 2.3 Rust 后端

| 路径 | 行数 | 依据 |
| --- | --- | --- |
| `src-tauri/src/mobile_access.rs` | 995 | 配对、密钥、设备列表、QUIC 发布；仅被 `lib.rs` 的 `mobile_*` 命令引用 |
| `src-tauri/src/mobile_router.rs` | 218 | 手机命令路由 |

### 2.4 构建与 CI

| 位置 | 改动 |
| --- | --- |
| `Cargo.toml` | `members` 移除 `crates/mobile-link` |
| `src-tauri/Cargo.toml` | 移除 `monocode-mobile-link` 依赖 |
| `package.json` | 移除 `mobile` 相关脚本（如有） |
| `.github/workflows/ci.yml` | 移除 `mobile` job；`host` 与 `check` 矩阵中的 `mobile/package-lock.json` 缓存路径 |
| `src-tauri/src/lib.rs` | 移除 `mod mobile_access; mod mobile_router;`、`mobile_access::init`、7 个 `mobile_*` 命令注册 |
| `src/app/App.tsx` | 移除 3 处 import、`useMobileWorkspace({...})` 整块（L9057–9152） |
| `src/features/settings/ui/SettingsView.tsx` | 移除 `MobileSettings` 的 import 与渲染 |
| `src/features/settings/model/settings.ts` | 移除 `SETTINGS_INDEX` 的 `mobile-access`（"Your phones"）条目，以及 `general` 的 `keywords` 中 `mobile phone iphone qr pair router` 片段 |

## 3. 明确保留（易误判）

| 项 | 为何容易误判 | 结论 |
| --- | --- | --- |
| `src-tauri/src/windows.rs` | 名字通用 | **保留**，Windows Job Object / DLL 目录，Windows 必需 |
| `src-tauri/src/tray.rs` | 名字通用 | **保留**，Windows 专属；关闭窗口只是隐藏，靠托盘唤回 |
| `remote` / `remote_ssh` / `host/` | 与"手机"概念接近 | **保留**，这是 SSH 远程主机（桌面 ↔ 主机），与手机无关 |
| `src-tauri/src/remote_bootstrap.sh` | 表面是 Unix 脚本 | **保留**，是**远程 Linux/macOS 主机**的引导脚本 |
| `host/windows-acl.ps1` | 名字含 Windows | **保留**，被 `remote_ssh.rs` 与 `host/build.mjs` 双重嵌入 |
| `quick-composer.html`、`mono-chat.html` | 随 `mono_chat.rs` 一起被考虑 | **保留**。其 Rust 后端是 macOS 独占，前端跨平台，属未决功能取舍，不在本次范围 |
| `src-tauri/src/quick_composer/`、`mono_chat.rs` | 同上 | **保留**，不属移动端 |
| `src/platform/tauri/trackpadZoom.ts`、`useTrafficLightsVisible.ts` | 仅 macOS 生效 | **保留**，属跨平台代码，删除会扩大与上游差异 |
| macOS/Linux 的全部 `cfg` 分支与 Cargo 依赖段 | — | **保留**，本次不动 |

## 4. 执行步骤（已按此顺序完成）

```
第 1 步  删除独立目录：mobile/、crates/mobile-link/、tests/mobile/
第 2 步  删除前端：src/features/mobile/
第 3 步  删除 Rust：mobile_access.rs、mobile_router.rs
第 4 步  解除引用：lib.rs（mod/init/generate_handler!）、App.tsx、SettingsView.tsx、settings.ts
第 5 步  收窄构建：Cargo workspace members、src-tauri/Cargo.toml
第 6 步  CI 清理：ci.yml 的 mobile job 与缓存路径
第 7 步  验证：cargo check / clippy / test、tsc、vitest、test:host
第 8 步  文档：AGENTS.md、README、docs 的移动端段落
```

## 5. 验证命令与结果

```powershell
cargo check --workspace --all-targets      # 通过，无警告
cargo clippy --workspace --all-targets -- -D warnings   # 通过
cargo fmt --check                          # 通过
cargo test                                 # 579 通过，1 失败（预存环境问题，见下）
npx tsc --noEmit                           # 通过
npx vitest run                             # 5529 通过，1 失败（预存环境问题，见下）
npm run test:host                          # 21 文件 / 102 测试通过
```

**残留校验（已执行，均为空）**：

```powershell
Select-String -Path src,host,src-tauri/src,tests,scripts `
  -Pattern "features/mobile|mobile_access|mobile_router|mobile-link|useMobileWorkspace|MobileSettings|PairPhone|mobile_list_dir|mobile_read_text_file"
cargo tree -p monocode | Select-String "mobile-link|quinn|if-addrs|igd-next|natpmp"
```

### 两个失败项均与本次删除无关（已用 stash 验证）

| 失败 | 原因 | 验证 |
| --- | --- | --- |
| `agentAppMemory.test.ts` > "lets the Mono add, pause, try and remove it" | `automations.ts:608` 的 `formatClock` 用 `toLocaleTimeString(undefined, …)` 跟随系统区域。本机区域 `zh-CN` 输出 `9:00`，测试硬编码 `9:00 AM` | 该文件与实现**均未改动**（`git status` 为空） |
| `skills::tests::lists_large_catalogs_from_every_root` | 测试读取真实 `$HOME`，本机存在额外的 `~/.agents/skills`、`~/.codex/skills` 目录，计数多 2（1403 vs 1401） | `git stash` 回到删除前代码后**同样失败**，确认预存 |

另有一次 `host/opencode-transport.test.ts` 报 `EPERM ... rmSync`，为 Windows 上临时目录句柄未及时释放的偶发竞争；单独重跑与全量重跑均通过。

## 6. 与汉化方案（`i18n-zh-plan.md`）的顺序

```
1. 删除移动端（本文档）        ← 已完成
2. 汉化阶段 0–1（地基 + 结构改造）
3. 汉化阶段 2–5（分批翻译）
```

第 1 步先做的收益已兑现：`src/features/mobile/`（18 文件 / 3,395 行）与 `MobileSettings.tsx` 已消失，`SETTINGS_INDEX` 从 55 条降为 **54 条**——这批文案无需翻译。

因为放弃了 macOS/Linux 清理，汉化阶段 0–1 对 `settings.ts` / `SettingsView.tsx` 的函数化改造**不会再有后续平台清理与之冲突**。

## 7. 执行记录

### 已删除

| 路径 | 规模 |
| --- | --- |
| `mobile/` | 208 文件 / 约 23,001 行 |
| `crates/mobile-link/` + 空目录 `crates/` | 6 文件 / 2,723 行 |
| `src/features/mobile/` | 18 文件 / 3,395 行 |
| `src-tauri/src/mobile_access.rs` | 995 行 |
| `src-tauri/src/mobile_router.rs` | 218 行 |
| `tests/mobile/watchFrames.test.ts` | 113 行 |

### 已就地修改

| 文件 | 改动 |
| --- | --- |
| `Cargo.toml` | workspace `members` 收窄为 `["src-tauri"]` |
| `src-tauri/Cargo.toml` | 移除 `monocode-mobile-link`、`quinn`、`if-addrs`、`hostname`、`igd-next`、`natpmp` |
| `src-tauri/src/lib.rs` | 移除 2 个 `mod`、`mobile_access::init`、8 个 `mobile_*` 命令注册、2 个 `fs::mobile_*` 注册 |
| `src-tauri/src/fs.rs` | 移除 `mobile_list_dir`、`mobile_read_text_file`、`inside_root`（失去唯一调用方）及其测试 |
| `src/app/App.tsx` | 移除 3 处 import、`useMobileWorkspace({…})` 整块（98 行）、随之无用的 `loadPinnedProjects` |
| `src/features/settings/ui/SettingsView.tsx` | 移除 `MobileSettings` import 与渲染 |
| `src/features/settings/model/settings.ts` | 移除 `SETTINGS_INDEX` 的 `mobile-access` 条目；`connections` 的 description 与 keywords 去掉手机措辞 |
| `.github/workflows/ci.yml` | 移除 `mobile` job |
| `README.md` | 移除移动端构建说明 |
| `AGENTS.md` | 改为「两套代码库 + Windows-first fork」，删除 mobile 相关条目 |
| `docs/i18n-zh-plan.md` | 同步删除完成后的现状与顺序 |

`src-tauri/src/lib.rs` 中的 `#[cfg_attr(mobile, tauri::mobile_entry_point)]` **有意保留**：它是 Tauri 的标准入口属性，不是 Expo 移动端功能。
