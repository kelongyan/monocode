import type { Dictionary } from "../../dictionary";

/**
 * Simplified Chinese dictionary.
 *
 * Typed as `Dictionary`, so a missing or extra key is a compile error rather
 * than a runtime fallback. `keywords` keep the English originals alongside
 * Chinese synonyms so settings search matches either language.
 */
export const zhCN: Dictionary = {
  common: {
    close: "关闭",
    cancel: "取消",
    save: "保存",
    renameNamed: "重命名 {name}",
    removeNamed: "移除 {name}",
  },
  settings: {
    groups: {
      app: "应用",
      agents: "代理",
      workspace: "工作区",
    },
    sections: {
      general: {
        label: "通用",
        description: "当前运行的版本、MonoCode 的通知方式，以及显示的面板。",
        keywords: "version update sounds notifications notes rail 版本 更新 声音 通知 便签",
      },
      connections: {
        label: "连接",
        description: "在其他机器上运行代理。",
        keywords: "ssh remote host machine server environment always on 远程 主机 服务器",
      },
      appearance: {
        label: "外观",
        description: "主题、色调、半透明效果、工作区布局和对话背景。",
        keywords:
          "theme dark light color accent glass blur zoom scale wallpaper rail sidebar 主题 深色 浅色 颜色 毛玻璃 模糊 缩放 壁纸 侧栏",
      },
      keybindings: {
        label: "快捷键",
        description: "工作区处理的所有快捷键，来自应用菜单和按键处理器。",
        keywords: "shortcut hotkey keyboard binding 快捷键 热键 键盘 绑定",
      },
      chat: {
        label: "对话",
        description:
          "对话记录的呈现方式、追问时的输入框行为、文件保存方式，以及差异的打开方式。",
        keywords:
          "transcript composer prompt message diff review layout format save editor 对话记录 输入框 提示 消息 差异 审阅 布局 格式化 保存 编辑器",
      },
      providers: {
        label: "服务提供方",
        description: "服务提供方账号、MonoCode 可驱动的代理 CLI，以及新会话的默认模型。",
        keywords:
          "account sign in login model harness claude codex gemini cli default hooks 账号 登录 模型 默认",
      },
      mcp: {
        label: "MCP",
        description: "查找各提供方中的 MCP 服务器并管理其连接。",
        keywords:
          "tools servers connections oauth authenticate login claude codex cursor opencode 工具 服务器 连接 认证 登录",
      },
      skills: {
        label: "技能",
        description: "从项目、个人和 harness 文件夹中发现并管理文件技能。",
        keywords: "skill instructions prompt 技能 指令 提示词",
      },
      monos: {
        label: "Mono",
        description: "标签页旁的常驻代理，以及哪些项目拥有它。",
        keywords: "mono resident agent mascot claim project title bar 常驻 代理 吉祥物 项目 标题栏",
      },
      inbox: {
        label: "收件箱",
        description: "管理收件箱服务，以及每个项目的通知偏好。",
        keywords:
          "github gitlab linear jira atlassian azure devops connect token integration 连接 令牌 集成",
      },
      archive: {
        label: "归档",
        description: "你已归档的项目和对话。",
        keywords: "archived restore delete hidden 归档 恢复 删除 隐藏",
      },
      worktrees: {
        label: "工作树",
        description: "管理每个项目的额外工作树。",
        keywords: "git branch worktree working copy project create delete 分支 工作副本 项目 创建 删除",
      },
    },
    entries: {
      "remote-machines": {
        label: "你的机器",
        keywords: "ssh remote connect host server environment 远程 连接 主机 服务器",
      },
      "mcp-servers": {
        label: "MCP 服务器",
        keywords: "claude tools connections oauth authenticate login add remove 工具 连接 认证 登录 添加 移除",
      },
      "monos-enabled": {
        label: "显示 Mono",
        keywords: "mono agent rail hide 代理 侧栏 隐藏",
      },
      "rail-monos-pinned": {
        label: "将 Mono 固定到图标栏",
        keywords: "mono rail compact collapsed icons top divider project picker 侧栏 紧凑 图标 项目选择器",
      },
      "mono-list": {
        label: "你的 Mono",
        keywords:
          "mono reset soul name projects sessions sidebar visibility hidden show 重置 名称 项目 会话 侧栏 显示",
      },
      "project-worktrees": {
        label: "项目工作树",
        keywords: "git branch working copy create delete manage 分支 工作副本 创建 删除 管理",
      },
      update: {
        label: "版本",
        keywords: "update upgrade release what's new build changelog 更新 升级 发布 新功能 构建 更新日志",
      },
      sounds: {
        label: "声音",
        keywords: "audio cue chime mute volume 音频 提示音 静音 音量",
      },
      notifications: {
        label: "通知",
        keywords: "notify alert toast permission reminder background 提醒 弹窗 权限 后台",
      },
      notes: {
        label: "便签",
        keywords: "notebook markdown rail scratchpad 笔记 侧栏 速记",
      },
      "quick-composer": {
        label: "快捷输入",
        keywords: "spotlight global shortcut hotkey floating prompt anywhere 全局 快捷键 浮动 提示",
      },
      "working-agents": {
        label: "工作中的代理",
        keywords: "live running sessions rail card 运行中 会话 侧栏 卡片",
      },
      "file-tabs": {
        label: "文件标签页",
        keywords: "editor open top workspace normal session pane beside chat 编辑器 工作区 会话 面板",
      },
      "tab-animations": {
        label: "标签页动画",
        keywords: "motion open close resize transition 动效 打开 关闭 调整大小 过渡",
      },
      "close-to-tray": {
        label: "关闭到托盘",
        keywords: "minimize background quit exit window taskbar windows 最小化 后台 退出 窗口 任务栏",
      },
      language: {
        label: "语言",
        keywords: "locale translation english chinese 语言 中文 翻译",
      },
      theme: {
        label: "主题",
        keywords: "dark light system appearance mode 深色 浅色 跟随系统 外观",
      },
      "workspace-theme": {
        label: "工作区主题",
        keywords:
          "color colour palette scheme preset inset harbor moss ember orchid 颜色 配色 预设",
      },
      "accent-color": {
        label: "强调色",
        keywords: "highlight bubble send button tint 高亮 气泡 发送 按钮 色调",
      },
      "diff-colors": {
        label: "差异颜色",
        keywords:
          "colorblind color blind accessibility added removed red green blue orange high contrast changes 色盲 无障碍 新增 删除 高对比度 变更",
      },
      hue: {
        label: "色相",
        keywords: "tint color chrome 色调 颜色",
      },
      saturation: {
        label: "饱和度",
        keywords: "tint color neutral grey gray 色调 颜色 中性 灰",
      },
      "dark-lightness": {
        label: "深色模式亮度",
        keywords: "black brightness contrast background 黑色 亮度 对比度 背景",
      },
      "inset-glass": {
        label: "透明窗口",
        keywords:
          "glass inset translucent transparency opaque desktop blur layout 毛玻璃 半透明 不透明 桌面 模糊 布局",
      },
      "sidebar-opacity": {
        label: "侧栏不透明度",
        keywords: "glass translucent transparency vibrancy 毛玻璃 半透明",
      },
      blur: {
        label: "模糊半径",
        keywords: "glass translucent vibrancy backdrop 毛玻璃 半透明 背景",
      },
      "main-pane-glass": {
        label: "主面板毛玻璃",
        keywords: "translucent transparency body window 半透明 主体 窗口",
      },
      "inset-layout": {
        label: "新布局",
        keywords:
          "classic preview sidebar navigation tabs inset workspace card rounded floating linear frame 经典 预览 侧栏 导航 标签页 工作区 卡片 圆角 浮动",
      },
      "interface-scale": {
        label: "界面缩放",
        keywords: "zoom font size bigger smaller ui 缩放 字体 大小 界面",
      },
      "collapsed-project-rail": {
        label: "折叠项目栏",
        keywords: "sidebar compact icons hidden navigation layout 侧栏 紧凑 图标 隐藏 导航 布局",
      },
      "show-excluded-files": {
        label: "显示被排除的文件",
        keywords: "explorer gitignore ignored hidden files tree 资源管理器 忽略 隐藏 文件 树",
      },
      "chat-background": {
        label: "对话背景",
        keywords: "wallpaper image picture opacity backdrop 壁纸 图片 不透明度",
      },
      "transcript-layout": {
        label: "对话记录布局",
        keywords: "full width chat bubble message 全宽 气泡 消息",
      },
      "anchor-prompts": {
        label: "提示固定在顶部",
        keywords: "scroll position sticky message 滚动 位置 固定 消息",
      },
      "paced-reveal": {
        label: "平滑文字显示",
        keywords: "streaming pacing immediate latency performance animation 流式 节奏 即时 延迟 性能 动画",
      },
      "follow-up": {
        label: "追问行为",
        keywords: "queue steer interrupt send while running 队列 插话 中断 运行中发送",
      },
      "model-controls": {
        label: "模型控件",
        keywords:
          "effort thinking reasoning fast service tier model picker composer 强度 思考 推理 快速 档位 模型选择器 输入框",
      },
      "composer-autocorrect": {
        label: "自动更正",
        keywords: "spelling spell check autocorrect typo macos composer 拼写 检查 输入框",
      },
      "composer-mascot": {
        label: "输入框吉祥物",
        keywords: "runner animation coin fun 跑动 动画 金币 趣味",
      },
      "format-on-save": {
        label: "保存时格式化",
        keywords: "prettier quotes editor save format 引号 编辑器 保存 格式化",
      },
      "diff-view": {
        label: "差异视图",
        keywords: "unified editor review changes working tree 统一 编辑器 审阅 变更 工作树",
      },
      "empty-session-games": {
        label: "空会话小游戏",
        keywords: "pacman snake arcade grid fun 吃豆人 贪吃蛇 街机 网格",
      },
      "agent-clis": {
        label: "代理 CLI",
        keywords:
          "codex opencode cursor grok pi omp fx hermes antigravity devin binary path 可执行文件 路径",
      },
      "provider-accounts": {
        label: "服务提供方账号",
        keywords:
          "account sign in login rename remove delete credentials profile usage limit quota exhausted 账号 登录 重命名 移除 删除 凭据 用量 限额 配额",
      },
      "show-remaining-usage": {
        label: "显示剩余用量",
        keywords: "usage limit meter bar left used quota percent 用量 限额 进度条 剩余 已用 配额 百分比",
      },
      "mask-emails": {
        label: "遮蔽账号邮箱",
        keywords: "email privacy blur hide screenshot account 邮箱 隐私 模糊 隐藏 截图 账号",
      },
      "claude-hooks": {
        label: "Claude Code 钩子",
        keywords: "pretooluse settings.json block command notification 阻止 命令 通知",
      },
      "idle-agents": {
        label: "保持空闲代理就绪",
        keywords: "memory ram cpu performance process warm park background 内存 CPU 性能 进程 预热 后台",
      },
      "project-notifications": {
        label: "项目通知",
        keywords: "mute resume sounds banners reminders categories 静音 恢复 声音 横幅 提醒 分类",
      },
      github: {
        label: "GitHub",
        keywords: "gh cli connect pull request sign in 连接 拉取请求 登录",
      },
      gitlab: {
        label: "GitLab",
        keywords: "token self-managed merge request connect 令牌 自建 合并请求 连接",
      },
      azuredevops: {
        label: "ADO",
        keywords: "azure devops boards repos pull request pat organization connect 看板 仓库 拉取请求 组织 连接",
      },
      jira: {
        label: "Jira",
        keywords: "atlassian cloud site email api token issues projects connect 站点 邮箱 令牌 工单 项目 连接",
      },
      linear: {
        label: "Linear",
        keywords: "api key issues teams connect 密钥 工单 团队 连接",
      },
      "show-archived": {
        label: "在侧栏显示归档",
        keywords: "hidden conversations list 隐藏 对话 列表",
      },
    },
    language: {
      group: "界面",
      label: "语言",
      description: "MonoCode 界面使用的语言。",
      hint: "应用于整个应用。",
    },
  },
  window: {
    minimize: "最小化",
    minimizeWindow: "最小化窗口",
    maximize: "最大化",
    maximizeWindow: "最大化窗口",
    restore: "还原",
    restoreWindow: "还原窗口",
    closeWindow: "关闭窗口",
  },
  accessPicker: {
    busyTitle: "更改将在下个回合生效。",
    busyHint: "权限更改将在下个回合生效。若要立即生效，请停止并重新发送。",
  },
  runtimeMode: {
    supervised: {
      label: "监督模式",
      hint: "执行命令和修改文件前询问。",
    },
    "auto-accept-edits": {
      label: "自动接受编辑",
      hint: "自动批准编辑，其他操作前询问。",
    },
    auto: {
      label: "自动",
      hint: "由 AI 审阅者批准或拒绝操作。",
    },
    "full-access": {
      label: "完全访问",
      hint: "在非计划回合中允许执行命令、编辑文件以及受支持的 MCP 确认，无需询问。",
    },
  },
};
