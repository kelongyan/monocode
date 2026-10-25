# 汉化（简体中文）方案书

> 目标：为 MonoCode 桌面端增加简体中文界面，且不破坏现有测试与上游同步能力。
> 本文件是执行计划。所有数字均由仓库实测得出（见附录 A 的统计命令）。
>
> 配套文档：[`windows-only-plan.md`](./windows-only-plan.md)（Windows-only 删除方案）。两者执行顺序见本文第 6 节与对方文档 6.1 节。

## 1. 现状结论

| 项目 | 事实 |
| --- | --- |
| i18n 基础设施 | **不存在**。无 `react-intl` / `i18next` / `lingui`，无 `useTranslation`，无语言设置项 |
| 可见文案 | 约 **911 处**（256 个 JSX 文本节点 + 789 个属性字符串，含 `aria-label`/`title`/`placeholder`） |
| TS/TSX 总字符串字面量 | 16,649（tsx）+ 15,408（ts）= 32,057，绝大部分**不是** UI 文案 |
| 重灾区 | `SettingsView.tsx` 870、`App.tsx` 974、`Sidebar.tsx` 761、`AgentTranscript.tsx` 727、`InboxView.tsx` 543 |
| 集中式文案 | `SETTINGS_SECTIONS`（12 个 section）、`SETTINGS_INDEX`（55 个设置项）、`RUNTIME_MODE_LABEL`/`HINT`、models 的 `label` |
| 原生文案 | `menu.rs`（~17 项 + 快捷键标签）、`tray.rs`（2 项） |
| 测试耦合 | **92 个测试文件、557 处**断言英文 `textContent`；**无** snapshot、**无** `getByText` |
| 设置搜索测试 | 断言**英文标签与排序**（`searchSettings("glass")` 期望 `["Main pane glass", "Blur radius", ...]`），并依赖英文 `keywords` 命中（`"steer"`、`"prettier"`）。在强制英文 locale 下仍可通过，但**暴露了一个必须处理的 i18n 设计点**（见 3.7） |
| 字体 | `--font-sans` 以 `system-ui` 开头，中文会回退，需显式补 CJK 栈 |
| 数字格式 | `shared/lib/numbers.ts` 硬编码 `en-US`；另有 39 处 `toLocale*`/`Intl` |

**核心判断**：难点不是翻译，而是把 911 处散落字面量安全收拢，同时不让 557 处英文断言失败。

## 2. 必须翻译 vs 禁止翻译

### 禁止翻译（先固化，防止误伤）

| 类别 | 具体位置 | 原因 |
| --- | --- | --- |
| 发给 AI 的提示词 | `features/orchestration/model/orchestration.ts`（`monocode_assignment`）、`orchestrationPlan.ts`、`sessions/model/btw.ts`、`handoff.ts`、`plan.ts`、`monos/model/monoFiles.ts`、`monoHabits.ts`、`src/instructions/inbox.md` | 提示词语言影响模型行为；翻译会改变 agent 输出语言与质量 |
| Provider 协议 | `integrations/harness/providers/**`（`claudeProtocol.ts` 339 串、`codexProtocol.ts` 422 串等） | 解析 CLI 输出，字符串是协议常量 |
| Tauri command / CLI action | `host/workspace-commands.ts`、`remoteCommands.ts`、`control_cli.rs` 的 ACTION 名 | 跨进程契约 |
| `data-*` 属性与 CSS 类 | 250 处 `data-*` | 浏览器测试与样式依赖 |
| localStorage / 设置 key | `monocode.*`（约 48 个） | 改名即丢用户数据 |
| Rust `Err(...)` | 用于错误码映射 | 应先映射成 code 再翻译 |

### 需要翻译（分层）

1. **UI 骨架**：标题栏、侧栏、标签、按钮、占位符、空状态、右键菜单。
2. **设置面板**：`SETTINGS_SECTIONS` + `SETTINGS_INDEX` + 各 section 正文。
3. **会话工作流**：composer、模型选择、权限模式、审批卡片、工具调用标题、错误提示。
4. **原生层**：`menu.rs`、`tray.rs`、Windows 安装包。

## 3. 架构设计

### 3.1 选型：自建轻量 `t()` + 分片词典

不引入 i18next / FormatJS。理由：
- 现有设置全部走 `monocode.*` + `loadX/saveX` 模式（`settings.ts` 有 20+ 个），加语言开关与之天然一致。
- 无复数规则需求（中文无复数），插值极少（`{count}`）。
- **自建可用 `tsc` 做编译期 key 校验**，这是现成库做不到的，而 `tsc` 已是本项目最强 CI 关卡。

若后续要加日语/德语，把 `t()` 换成 `react-i18next` 即可，词典与提取流程不变。

### 3.2 目录结构

```
src/shared/i18n/
  index.ts             # t(), useT(), LocaleProvider, setLocale, getLocale
  store.ts             # 模块级 locale store + useSyncExternalStore 订阅
  types.ts             # Locale = "en" | "zh-CN"
  locales/
    en/
      common.ts  app.ts  settings.ts  sessions.ts  inbox.ts
      source-control.ts  monos.ts  files.ts  workspace.ts  providers.ts
      notifications.ts  automations.ts  notes.ts  skills.ts  search.ts
      terminal.ts  quick-composer.ts  connections.ts  index.ts
    zh-CN/            # 与 en 同构
```

**按 feature 分片**而非单文件：911 个 key 放单文件会让 diff 和 review 失控；分片后"谁改哪个功能就改哪个片"，多人并行无冲突。

### 3.3 API 两档

```ts
// 档 1：模块级常量可用（非 React 上下文）
import { t } from "../../shared/i18n";
t("settings.general.label");

// 档 2：React 组件内，语言切换后自动重渲染
const t = useT();
```

无 `LocaleProvider` 时 `t()` 回退 `en`。**这一条很重要**：`tests/browser/` 的 10 个 fixture 直接渲染真实组件，回退英文意味着 fixture 一行都不用改。

### 3.4 类型安全（把"漏翻"变成编译错误）

```ts
// locales/en/index.ts 为唯一真相源
export const en = { common: {...}, app: {...}, ... };
export type Dictionary = typeof en;

// locales/zh-CN/index.ts
export const zhCN: Dictionary = { ... };   // 缺 key / 多 key / 类型不符 → tsc 报错
```

### 3.5 必须先改造的结构（否则切语言不生效）

三个模块级常量在**模块加载时**就已求值，直接塞 `t()` 会导致切换语言后不更新：

| 现状 | 改造 |
| --- | --- |
| `SETTINGS_SECTIONS: SettingsSection[]`（12 条，含 `label`/`description`/`keywords`） | 改为 `settingsSections(): SettingsSection[]` 函数 |
| `SETTINGS_INDEX: SettingsEntry[]`（55 条，含 `label`/`keywords`） | 改为 `settingsIndex(): SettingsEntry[]` |
| `RUNTIME_MODE_LABEL` / `RUNTIME_MODE_HINT`（`sessions/model/session.ts`） | 改为 `runtimeModeLabel(mode)` / `runtimeModeHint(mode)` |

连带修改：
- `settingsSectionLabel()` / `settingsSectionDescription()`（内部查 `SETTINGS_SECTIONS`）
- `searchSettings()`（遍历上述两个常量）
- `SettingsView.tsx` 中的引用

**已验证影响面**：`settings.test.ts` 与 `SettingsView.test.ts` 共 18 处引用这些常量。其中绝大多数断言 id 集合、section 分组、条目所属 section（这类与语言无关）；但 `settings.test.ts` 的 `describe("settings search")` 里 5 条用例**直接断言英文 label 字符串**，例如：

```ts
expect(searchSettings("glass").map((r) => r.label)).toEqual([
  "Main pane glass", "Blur radius", "Sidebar opacity", "Transparent window", "Appearance",
]);
```

结论：改造成函数后，只要测试环境强制 `setLocale("en")`（阶段 0 第 7 步），这些用例**无需改动即可通过**。但它们依赖英文 `keywords` 才能命中，这引出了 3.7 的必要设计。

### 3.7 搜索必须能匹配中文（容易被忽略）

设置搜索的命中逻辑是 `matchScore(needle, label, keywords)`：英文下用户输入 `glass`、`steer`、`prettier` 都能命中，因为这些词在 `label` 或 `keywords` 里。

中文界面下用户会输入「模糊」「追加」「格式化」，而现有 `keywords` 全是英文，**搜索会直接失效**。要求：

- 每个 `SETTINGS_INDEX` / `SETTINGS_SECTIONS` 条目的 `keywords` 在 zh-CN 词典中提供**中文同义词**，并**保留英文原词**，让中英输入都能命中。
- 词典结构因此需要 `label` + `keywords` 成对出现，例如：
  ```ts
  // zh-CN/settings.ts
  "settings.glass.label": "主面板毛玻璃",
  "settings.glass.keywords": "glass 模糊 透明 毛玻璃",
  ```
- 在阶段 2 的验收项中加一条：中文下用「模糊」「格式化」「追加」三个词能搜到对应设置。

### 3.6 字体

在 `src/styles/index.css` 的 `--font-sans` 补 CJK 回退，顺序保持 `system-ui` 优先（Windows 上解析为 Segoe UI，中文自动落 Microsoft YaHei）：

```css
--font-sans:
  system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", ...;
```

`--font-mono` / `--font-terminal` **不要**加中文字体：等宽是中英混排对齐的前提，中文回退到系统字体即可。

## 4. 测试策略（本方案最大风险点）

现状：557 处断言英文文本。若不处理，翻译后 `npm run check` 会大面积失败。

### 推荐组合（三层）

**第 1 层 — 测试固定英文**
`vitest.config.ts` 增加 `setupFiles`，在测试环境强制 `setLocale("en")`。
✅ 557 处断言零改动。
⚠️ 代价：中文文案零测试覆盖。

**第 2 层 — 词典一致性测试**（`src/shared/i18n/i18n.test.ts`，约 60 行）
- en 与 zh-CN 的 key 集合完全一致
- 无空字符串、无未替换的占位符
- zh-CN 中不含连续的 ASCII 句子（粗筛漏翻）
- 所有 `{placeholder}` 在两种语言中同名同数量

**第 3 层 — 中文冒烟测试**（约 5 条）
`SettingsView`、`Composer`、`Sidebar`、`ModelPicker`、`AgentTranscript` 各 1 条，在 `setLocale("zh-CN")` 下断言关键中文 label 存在。覆盖"翻译错位/渲染崩溃"这类词典测试查不出的问题。

### 浏览器测试
`tests/browser/` 断言几何与 `data-*`，不依赖文案 → **不受影响**。因为 `t()` 在无 Provider 时回退 `en`，10 个 fixture 无需改动。这一点已在 3.3 设计时保证。

## 5. 分阶段实施

### 阶段 0：地基（0.5 天）— ✅ 已完成
1. 建 `src/shared/i18n/`，实现 `t` / `useT` / `setLocale` / store。
2. 语言持久化：`monocode.locale`（新增 `readString/writeString`，或直接 `localStorage`）。
3. `src/features/settings/model/locale.ts`：`loadLocale()` / `saveLocale()`。
4. `SettingsView` → General → Appearance 增加语言下拉（English / 简体中文）。
5. 补 `--font-sans` 的 CJK 回退。
6. `main.tsx` 在 `createRoot` 前 `setLocale(loadLocale())`，避免首屏英文闪烁。
7. `vitest.config.ts` 加 `setupFiles: ["src/test/setup.ts"]`，其中 `setLocale("en")`。

**验收**：切到中文，界面仍为英文，无报错；`npm run check:web` 全绿。

#### 实际落地

| 文件 | 内容 |
| --- | --- |
| `src/shared/i18n/types.ts` | `Locale`、`LOCALES`、`LOCALE_LABEL`、`isLocale` |
| `src/shared/i18n/dictionary.ts` | 由 `en` 推导 `Dictionary`；`Leaves<>` 生成 `MessageKey` 联合类型 |
| `src/shared/i18n/store.ts` | 模块级 locale store + 订阅（`useSyncExternalStore`） |
| `src/shared/i18n/index.ts` | `t(key, vars?)`、`useT()`、`useLocale()`、`setLocale`；无 Provider 时回退 `en` |
| `src/shared/i18n/locales/en/index.ts` | 唯一真相源 |
| `src/shared/i18n/locales/zh-CN/index.ts` | 标注 `: Dictionary`，漏键/多键即编译错误 |
| `src/shared/i18n/i18n.test.ts` | 8 条：键集合一致、无空值、占位符一致、回退与插值 |
| `src/features/settings/model/locale.ts` | `loadLocale()` / `saveLocale()`（`monocode.locale`） |
| `src/features/settings/model/locale.test.ts` | 4 条：默认值、往返、非法值、订阅者重渲染 |
| `src/test/setup.ts` | 测试环境固定 `setLocale("en")` |
| `vitest.config.ts` | 接上 `setupFiles` |
| `src/main.tsx` | 首屏渲染前 `setLocale(loadLocale())` |
| `src/styles/index.css` | `--font-sans` 补 `Microsoft YaHei` / `PingFang SC` / `Noto Sans CJK SC` |
| `SettingsView.tsx` | Appearance 页顶部「界面 / 语言」分段控件 |
| `settings.ts` | `SETTINGS_INDEX` 新增 `language` 条目（共 55 条） |

**验证**：`tsc` 通过；`vitest` 5541 通过（仅剩 1 条预存时区失败）；`cargo fmt --check` 通过。

**两个实施要点**（后来者容易踩）：

1. **`SETTINGS_INDEX` 双向校验**：`SettingsView.test.ts` 的 `renders every indexed setting on the $section page` 与 `only tags rows that search can find` 互为反向断言——新增任何带 `id` 的 `<Row>` 必须同时在 `SETTINGS_INDEX` 登记，否则两条都红。
2. **`en` 不能加 `as const`**：这会把 `"Close"` 变成字面量类型，使 `zhCN: Dictionary` 无法赋 `"关闭"`。用普通对象字面量，让 `Dictionary = typeof en` 推导为 `string`。

### 阶段 1：结构改造 + 骨架文案（2 天）— ✅ 已完成

1. `SETTINGS_SECTIONS` / `SETTINGS_INDEX` / `RUNTIME_MODE_*` 函数化（3.5），同步修 18 处测试引用。
2. 翻译：`app/shell/`（`TitleBar`、`Sidebar`、`WindowControls`）、`sessions/ui/Composer.tsx`、`ModelPicker.tsx`。

**验收**：主界面、侧栏、输入框、模式选择为中文；测试全绿。

#### 实际落地

结构改造（3.5 节的三项全部完成）：

| 原常量 | 现形式 | 说明 |
| --- | --- | --- |
| `SETTINGS_GROUPS` | `SETTINGS_GROUP_IDS` + `settingsGroups()` | 文本来自 `settings.groups` |
| `SETTINGS_SECTIONS` | `SETTINGS_SECTION_ROWS` + `settingsSections()` | 文本来自 `settings.sections` |
| `SETTINGS_INDEX` | `SETTINGS_ENTRY_ROWS` + `settingsIndex()` | 文本来自 `settings.entries`，**键名即设置 id** |
| `RUNTIME_MODE_LABEL` / `_HINT` | `runtimeModeLabel()` / `runtimeModeHint()` | 文本来自 `runtimeMode.<mode>` |

配套改动：
- `searchSettings()`、`settingsSectionLabel()`、`settingsSectionDescription()` 改为调用上述函数；`isSettingsSectionId()` 改用静态的 `SETTINGS_SECTION_ROWS`（不依赖 locale）。
- 新增 `messages(): Dictionary`（`src/shared/i18n/index.ts`），用于按闭合联合索引结构化文本，避免拼 key 字符串后需要断言。
- 词典的 `settings.entries` 键直接用 kebab-case 设置 id（如 `"format-on-save"`），索引可直接 `entries[row.id]` 取值，不需要第二套命名映射。

新增的中文覆盖：

| 文件 | 内容 |
| --- | --- |
| `locales/*/index.ts` | `settings.groups`(3) + `settings.sections`(12) + `settings.entries`(55) + `runtimeMode`(4) + `window`(7) + `accessPicker`(2) |
| `WindowControls.tsx` | 最小化/最大化/还原/关闭的 title 与 aria-label |
| `AccessPicker.tsx` | 权限模式标签、提示、"更改将在下个回合生效" |
| `SettingsRail.tsx` | 订阅 locale，章节名随语言切换 |
| `QuickPermissions.tsx` / `QuickComposer.tsx` | 权限模式标签 |
| `settingsLocale.test.ts` | 6 条中文断言，覆盖章节/条目/搜索/模式 |

**验证**：`tsc` 通过；`vitest` 5547 通过（仅剩 1 条预存时区失败）；`cargo fmt --check` 通过。

**三个实施要点**：

1. **所有 `entries` 的 `keywords` 必须中英并列**。中文界面下用户输入「毛玻璃」「快捷键」要能命中，同时保留 `prettier`、`glass` 等英文原词。`settingsLocale.test.ts` 对这两种输入都有断言。
2. **组件必须订阅 locale**。`settingsSections()` 等函数只在调用时读词典，若组件不订阅就不会重渲染。`SettingsRail`、`AccessPicker`、`QuickPermissions` 都加了 `useLocale()`/`useT()`；`SettingsView` 通过 `useAppearanceSettings` 内的 `useLocale()` 间接订阅。
3. **`SETTINGS_ENTRY_ROWS` 的类型要写成具名 `SettingsEntryRow`**。若把 `keyof Dictionary["settings"]["entries"]` 内联并配合 `...(IS_MAC ? [...] : [])` 条件展开，TS 会把 `row.id` 拓宽成 `string`，导致 `entries[row.id]` 索引报错。

**未做**：`TitleBar.tsx`(187 串)、`Sidebar.tsx`(616 串)、`Composer.tsx`(161 串)、`ModelPicker.tsx`(322 串) 的正文文案。这四文件合计约 1,286 处字符串，其中大量是 CSS 类名、`data-*` 与图标名，需要逐条甄别；按方案 5 节的分批策略留到阶段 2/3，与设置面板一起推进，避免单次提交过大。


### 阶段 2：设置面板（3 天）
按 section 拆成多个 PR：general / appearance / providers / accounts / keysbindings / chat / monos / inbox / worktrees / archive。
`SettingsView.tsx` 有 4,680 行，**禁止一次性改完**，否则 review 与冲突都不可控。

### 阶段 3：核心工作流（3 天）
`AgentTranscript.tsx`、`InboxView.tsx`、`GitChangesPanel.tsx`、`FileTree.tsx`、`Monos` 系列、`AutomationsView.tsx`。

### 阶段 4：原生层（1 天）
- `menu.rs`：`build()` 已接收参数，加 `locale: &str` 查表；新增 command 在语言切换时**重建菜单**。
- `tray.rs`：2 个字符串，同上。
- `tauri.windows.conf.json` 增加 `bundle.windows.nsis.languages: ["SimpChinese", "English"]`。

### 阶段 5：格式化与细节（1 天）
- `numbers.ts` 的 `en-US` → 跟随 locale（中文千分位规则相同，风险低）。
- 39 处 `toLocale*`：区分「日期时间」（跟随 locale）与「文件大小/百分比」（保留）。
- 视觉回归：中文更短但可能换行异常，重点看 `Sidebar`、`TitleBar`、窄屏 `SettingsView`。

### 阶段 6：防回退（0.5 天）
脚本/测试扫描 `src/**/*.tsx`：JSX 文本节点出现中英混合字面量且不在豁免名单则告警。建议先软告警跑一周再转硬失败。

**合计：约 11 人日**（不含移动端）。

## 6. 与删除方案的关系（重要）

删除方案已收敛为**只删移动端**（见 [`windows-only-plan.md`](./windows-only-plan.md)），macOS/Linux 桌面代码与远程主机能力全部保留，以便继续吸收上游修复。

| 影响 | 说明 |
| --- | --- |
| `src/features/mobile/`、`MobileSettings.tsx` 等已删除 | 这批文案（约 427 行）无需翻译，已节省工作量 |
| `SETTINGS_INDEX` 的 `mobile-access`（"Your phones"）已移除 | `SETTINGS_INDEX` 现为 54 条，汉化时以实际为准 |
| `settings.ts` / `SettingsView.tsx` 的 3.5 节函数化改造 | **不再有后续平台清理冲突**，可一次性改到位 |
| macOS/Linux `cfg` 分支 | 保留不动，汉化阶段 4（原生层）只处理 `menu.rs` / `tray.rs`，两者均为 Windows 已有路径 |

**落地顺序**：

```
1. 删除移动端                  ← 已完成
2. 汉化阶段 0（地基 + 测试 setup）
3. 汉化阶段 1（结构改造 + 骨架文案）
4. 汉化阶段 2–5（分批翻译）
```

**若只做一件事**：做汉化。词典是新增文件，不改上游代码结构，冲突面最小。

## 7. 与上游同步的代价

汉化会修改 **150+ 个源文件**（每处 `"文本"` → `t("key")`），这是与 upstream 的**永久性分叉**。缓解手段：

1. 词典放独立目录 `src/shared/i18n/locales/`，上游不碰 → 冲突面最小。
2. 组件改动是机械替换，冲突可脚本化重放。
3. 建议：**定期从 upstream cherry-pick `integrations/harness/providers/` 的协议修复**（这是本仓库最活跃、对汉化零影响的部分），其余不跟随。

若预期长期维护，建议直接 fork 并停止 rebase，避免每次同步都在 `SettingsView.tsx`（4680 行）上手工解冲突。

## 附录 A：统计命令（可复现）

```powershell
# 可见文案规模
Get-ChildItem src -Recurse -Include *.tsx | Where-Object {$_.Name -notmatch '\.test\.'} |
  ForEach-Object { (Select-String -Path $_.FullName -Pattern '"[^"\\]{3,}"' -AllMatches).Matches.Count } |
  Measure-Object -Sum

# 英文文本断言数量（翻译风险面）
Get-ChildItem src -Recurse -Include *.test.ts |
  Select-String -Pattern 'textContent.{0,30}(toContain|toBe|toEqual)\(\s*"[A-Za-z]{2,}' |
  Measure-Object

# 平台分支数量（删除方案用）
Get-ChildItem src-tauri\src -Recurse -Include *.rs |
  Select-String -Pattern 'target_os = "(macos|linux)"' | Measure-Object
```
