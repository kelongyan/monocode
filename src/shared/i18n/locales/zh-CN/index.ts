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
    edit: "编辑",
    remove: "移除",
    back: "返回",
    renameNamed: "重命名 {name}",
    removeNamed: "移除 {name}",
  },
  monos: {
    title: "Mono",
    newMono: "新建 Mono",
    stopReply: "停止回复",
    stopReplyHint: "停止回复（Esc）",
    openInApp: "在 MonoCode 中打开",
    hideChat: "隐藏对话",
    closeDocument: "关闭文档",
    closeHint: "关闭（Esc）",
    starting: "正在启动…",
    habitRuns: "运行次数",
    habitNext: "下次",
    habitWhatItDoes: "它做什么",
    habitRecentRuns: "最近运行",
    habitPlaceholder: "每次运行应做什么，以及何时值得告知你。",
    projects: "项目",
    attachFiles: "附加文件",
    send: "发送",
    emoji: "表情",
    addEmoji: "添加表情",
    soul: "灵魂",
    soulPlaceholder: "它是谁，以及它应始终牢记什么",
    memory: "记忆",
    addMemory: "添加记忆",
    newMemory: "新建记忆",
    editMemory: "编辑记忆",
    memoryPlaceholder: "它应该记住的事",
    upcoming: "即将运行",
    done: "已完成",
    meetMonos: "认识 Mono",
    showMonos: "显示 Mono",
    hideFromRail: "从项目栏隐藏 Mono。可在「设置 › Mono」中重新开启。",
    overview: "概览",
    activity: "活动",
    searchSessions: "搜索会话...",
    filterSessions: "筛选会话",
    mascot: "吉祥物",
    color: "颜色",
    addProject: "添加项目",
    openInWorkspace: "在工作区打开",
    hideOverview: "隐藏概览",
    chooseAnotherModel: "选择其他模型",
    newHabit: "新建习惯",
    name: "名称",
    repeats: "重复",
    settingsSections: "设置分区",
    modelTitle: "模型",
    modelDescription: "它用什么思考并回复。",
    permissionsLabel: "权限",
    permissionsDescription: "它无需询问即可执行的操作。",
    projectsDescription: "它可以查看这些项目中的每个会话、便签和文件夹。",
    sessionsItStarts: "它启动的会话",
    showSessionsInSidebar: "在侧栏显示会话",
    showSessionsDescription:
      "它启动的会话会出现在项目侧栏。隐藏的会话仍会保存，可从它的概览中打开。",
    groupInFolder: "归入文件夹",
    conversationTitle: "对话",
    resetConversation: "重置对话",
    resetConversationDescription:
      "清空所有消息并重新开始。它的灵魂、记忆和习惯会保留。",
    changeMascotAndColor: "更改吉祥物和颜色",
    mascotAndColor: "吉祥物和颜色",
  },
  settings: {
    groups: {
      app: "应用",
      agents: "代理",
      workspace: "工作区",
    },
    /** The Settings window title. */
    title: "设置",
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
    options: {
      system: "跟随系统",
      dark: "深色",
      light: "浅色",
      default: "默认",
      colorblind: "色盲友好",
      highContrast: "高对比度",
    },
    status: {
      connected: "已连接",
      signInRequired: "需要登录",
      notInstalled: "未安装",
      saving: "保存中",
      connect: "连接",
    },
    search: {
      placeholder: "搜索设置",
      clear: "清除设置搜索",
      results: "设置搜索结果",
      filter: "筛选",
    },
    pages: {
      general: {
        alertsTitle: "提醒",
        alertsDescription: "当你在别处工作时，MonoCode 如何通知你。",
        soundsLabel: "声音",
        soundsDescription:
          "项目活动、回合结束和可用更新时的短提示音。在收件箱设置中选择项目通知类别。切换开关和复制完成的回合时也会播放。",
        notificationsLabel: "通知",
        notificationsDescription:
          "当提醒到期，或代理在另一个会话中完成、需要输入，或 MonoCode 处于后台时发出通知。点击通知可打开该会话。",
        workspaceTitle: "工作区",
        workspaceDescription: "项目导航和工作区标签页的行为。",
        fileTabsLabel: "文件标签页",
        fileTabsDescription:
          "在当前对话旁打开文件，或在顶部标签栏中为每个文件分配普通标签页。顶部标签栏的文件仍可合并为分屏。",
        tabAnimationsLabel: "标签页动画",
        tabAnimationsDescription:
          "标签页打开和关闭时播放动画。关闭后标签页立即切换。",
        notesLabel: "便签",
        notesDescription:
          "位于项目栏的全局 Markdown 笔记本。可从对话记录中保存已完成的回合，之后用 @note 提及或加入对话。",
        quickComposerLabel: "快捷输入",
        workingAgentsLabel: "工作中的代理",
        workingAgentsDescription:
          "当有两个或更多对话正在进行时，项目栏上的卡片会列出它们，方便你跨项目跳转。已完成的回合会保留，直到你打开该会话。",
        closeToTrayLabel: "关闭到托盘",
        closeToTrayDescription:
          "关闭窗口时将其隐藏到系统托盘而不是退出，让运行中的代理继续工作。可从托盘图标重新打开，并从其菜单真正退出。关闭此项后，关闭将结束窗口。",
        aboutTitle: "关于",
      },
      chat: {
        transcriptTitle: "对话记录",
        transcriptDescription: "对话在增长过程中的呈现方式。",
        transcriptLayoutLabel: "对话记录布局",
        transcriptLayoutDescription:
          "全宽模式将用户提示显示为横跨整行的卡片。对话模式将其右对齐并限制最大宽度，类似消息应用。",
        anchorPromptsLabel: "提示固定在顶部",
        anchorPromptsDescription:
          "发送时，新提示位于对话记录顶部，回复在其下方空间展开。关闭后保持经典布局，最新消息停留在输入框上方。",
        pacedRevealLabel: "平滑文字显示",
        pacedRevealDescription:
          "逐步显示收到的文字。关闭后立即显示已接收的文本。这只改变显示节奏，不影响处理速度。",
        composerTitle: "输入框",
        composerDescription: "输入框如何处理你输入的内容。",
        followUpLabel: "追问行为",
        followUpDescription:
          "将追问排队，等当前回合结束后发送；或立即插话到当前回合。",
        modelControlsLabel: "模型控件",
        modelControlsDescription: "在选择器旁显示模型选项，而不是放在模型菜单里。",
        autocorrectLabel: "自动更正",
        autocorrectDescription:
          "会话和 Mono 输入框中的拼写检查与自动更正提示。关闭后文本保持原样。",
        editorTitle: "编辑器",
        editorDescription: "在工作区编辑器中保存文件时的行为。",
        formatOnSaveLabel: "保存时格式化",
        formatOnSaveDescription:
          "写入前对受支持的文件运行 Prettier。关闭后保留你输入的文本，包括引号风格。",
        reviewTitle: "代码审阅",
        reviewDescription: "查看回合变更时，它们在何处打开。",
        diffViewLabel: "差异视图",
        diffViewDescription:
          "编辑器模式在工作树中保留文件改动。统一模式将所有改动文件堆叠在一次审阅中，带固定表头并折叠未改动行。",
        extrasTitle: "附加",
        extrasDescription: "空闲动画，仅此而已。两者都关闭可获得静止的工作区。",
        composerMascotLabel: "输入框吉祥物",
        composerMascotDescription:
          "回合运行时，项目吉祥物沿输入框跑动，第一次会撞到「滚动到最新」按钮，然后跳过它，有时还会抓取金币。",
        emptySessionGamesLabel: "空会话小游戏",
        emptySessionGamesDescription:
          "吃豆人和贪吃蛇在空会话网格上待机。悬停在区域上可操控当前显示的那一个。关闭后该面板保持静止。",
      },
      appearance: {
        themeTitle: "主题",
        themeDescriptionInset: "每个工作区主题都有自己的深色和浅色调色板。",
        themeDescriptionClassic:
          "深色和浅色共用同一色调，因此下方的颜色设置对两者都生效。",
        themeHint: "跟随系统则使用操作系统外观。",
        workspaceThemeDescription:
          "内嵌工作区外壳、卡片、文字和强调色所用的颜色。每个主题都有深色和浅色调色板。",
        insetGlassLinux: "窗口在 Linux 上保持不透明。",
        insetGlassLight: "浅色模式保持窗口不透明。你的深色模式选择会被记住。",
        insetGlassHint: "透过窗口显示桌面。关闭后窗口保持不透明。",
        accentColorDescription: "用于输入框的发送按钮和你的消息气泡。",
        diffColorsDescription:
          "新增和删除行的颜色。色盲友好和高对比度使用蓝色与橙色代替绿色与红色；高对比度会加强着色和文字对比。",
        colorTitle: "颜色",
        colorDescription:
          "色相和饱和度影响所有界面。亮度只作用于深色主题。",
        hueDescription: "强调色和着色界面的基础色相。",
        saturationDescription: "色相对界面的着色强度。设为零则保持中性。",
        translucencyTitle: "半透明",
        sidebarOpacityDescription: "作用于项目栏和其他毛玻璃面板。",
        blurDescription: "窗口背后的背景模糊。",
        mainPaneGlassDescription:
          "将会话和编辑器背后的主面板也应用半透明效果。",
        layoutTitle: "布局",
        insetLayoutDescription:
          "使用重新设计的侧栏、项目切换器、工作区标签页和右侧面板。关闭可返回经典布局。",
        collapsedRailDescription:
          "将项目导航保留为紧凑的图标栏，或完全隐藏该栏。",
        interfaceScaleDescription:
          "缩放整个界面。也可使用 Ctrl+=、Ctrl+- 和 Ctrl+0（macOS 上为 Cmd）。",
        showExcludedFilesDescription:
          "在资源管理器中显示 Git 排除的文件和文件夹，例如构建产物和依赖。",
      },
      inbox: {
        githubDescription: "通过 GitHub CLI 读取的拉取请求、审阅和工单。",
        gitlabDescription: "来自 GitLab.com 或自建实例的合并请求。",
        azureDescription: "来自你的 ADO 组织的拉取请求和 Boards 工作项。",
        jiraDescription: "来自你所选项目的 Jira Cloud 工单。",
        linearDescription: "来自你所选团队、指派给你的工单。",
        githubReady:
          "GitHub CLI 已安装并已认证。MonoCode 使用它读取 GitHub 收件箱条目。",
        githubNeedsLogin:
          "在终端运行 gh auth login，完成登录流程后再次检查。",
        githubMissing:
          "从 cli.github.com 安装 GitHub CLI，在终端运行 gh auth login，然后再次检查。",
        gitlabConnectDescription:
          "连接 GitLab.com 或自建 GitLab 实例。请使用具有 API 访问权限的个人访问令牌；令牌保存在本地，「断开连接」会将其删除。",
        azureConnectDescription:
          "使用个人访问令牌连接你的 ADO 组织（Boards + Repos 读写以支持评论）。令牌保存在本地，「断开连接」会将其删除。",
        linearConnectDescription:
          "在 Linear → Settings → Security & Access 中创建个人 API 密钥。「断开连接」会将其删除。",
        connectionLabel: "连接",
        apiKeyLabel: "API 密钥",
        gitlabUrlLabel: "GitLab 地址",
        gitlabTokenLabel: "GitLab 访问令牌",
        azureUrlLabel: "Azure DevOps 组织地址",
        azureTokenLabel: "Azure DevOps 个人访问令牌",
        linearKeyLabel: "Linear API 密钥",
        checkingForUpdates: "正在检查更新…",
        updateCheckFailed: "检查更新失败。",
        updateFeedHint: "MonoCode 从发布源自行更新。",
        download: "下载",
        checkForUpdates: "检查更新",
      },
      keybindings: {
        groupTitle: "快捷键",
        groupDescription: "点击快捷键可录制新的按键。录制时按 Delete 可将其禁用。",
        filterLabel: "筛选快捷键",
        commandColumn: "命令",
        bindingOne: "项绑定",
        bindingOther: "项绑定",
      },
      providers: {
        agentClisTitle: "代理 CLI",
        defaultsScopeLabel: "服务提供方默认值范围",
        advancedTitle: "高级",
        idleAgentsLabel: "保持空闲代理就绪",
        idleAgentsDescription:
          "已完成的对话会让其代理 CLI 继续运行几分钟，以便追问立即开始。每个进程可能占用几百 MB 内存。超过此数量时，空闲最久的会提前停止；下次发消息时经短暂重启后恢复。内存紧张的机器请选择「无」。",
        claudeHooksLabel: "Claude Code 钩子",
        claudeHooksDescription:
          "运行 settings.json 中配置的钩子——PreToolUse 命令重写、拦截、通知等——与 Claude Code CLI 的行为一致。若某个钩子行为异常且你需要取回会话，请关闭此项。下个回合生效。",
        usageTitle: "用量与隐私",
        showRemainingUsageLabel: "显示剩余用量",
        showRemainingUsageDescription:
          "用量条以每个限额的剩余量填充，而不是已用量。",
        maskEmailsLabel: "遮蔽账号邮箱",
        maskEmailsDescription:
          "在设置和用量弹层中模糊账号邮箱，点击后才显示，避免出现在截图里。",
        accountsTitle: "账号",
        accountsDescription:
          "为支持账号配置的服务提供方创建独立的登录。仍可从页脚的用量控件切换账号。",
        renameAccountTitle: "重命名账号",
        removeAccountTitle: "移除账号",
        invalidVersion: "{provider} CLI 返回了无效的版本号。",
        tooOld: "OpenCode v{version} 版本过旧，请升级到 v{minimum} 或更高版本。",
      },
      archive: {
        title: "已归档项目",
        description: "从项目栏归档项目，可保留其对话而不在侧栏中列出。",
        showArchivedLabel: "在侧栏显示归档",
        showArchivedDescription: "让已归档的对话与活动对话一起列出。",
      },
      monos: {
        groupTitle: "Mono",
        enabledLabel: "显示 Mono",
        enabledDescription:
          "位于项目栏上属于你的代理。每个 Mono 在你指定的项目上工作，记住重要信息，并会自主执行习惯任务。关闭此项可隐藏它们。",
        pinnedLabel: "将 Mono 固定到图标栏",
        pinnedDescription:
          "当项目栏折叠为图标时，将每个 Mono 显示在栏顶部（分隔线之上），而不是放在项目选择器里。",
        menuBarLabel: "菜单栏图标",
        menuBarDescription:
          "从 macOS 菜单栏与 Mono 对话或打开快捷输入。关闭此项可隐藏该图标。",
        listTitle: "你的 Mono",
        listDescription:
          "选择每个 Mono 启动的新会话是否显示在侧栏。隐藏的会话仍会保存，可从该 Mono 的对话中打开。使用项目栏上的加号添加 Mono，并在其详情中选择项目。",
        resetLabel: "重置 Mono",
        resetDefaultsTitle: "重置为默认值",
      },
      chatBackground: {
        title: "对话背景",
        description: "对话面板背后的图片。仅保存在本设备。",
        effectLabel: "背景效果",
        showOnLabel: "显示于",
        showOnDescription: "仅空会话，或所有对话。",
        showBackgroundOnLabel: "背景显示于",
        emptyVisibilityLabel: "空会话可见度",
        emptyVisibilityDescription: "对话尚无消息时的背景强度。",
        emptyBackgroundVisibilityLabel: "空会话背景可见度",
        sessionVisibilityLabel: "会话可见度",
        sessionVisibilityDescription: "对话已有消息后的背景强度。",
        sessionBackgroundVisibilityLabel: "会话背景可见度",
      },
    },
  },
  menu: {
    file: "文件",
    view: "视图",
    terminal: "终端",
    newTab: "新建标签页",
    newTerminal: "新建终端",
    newWindow: "新建窗口",
    autosave: "自动保存",
    openProject: "打开项目…",
    search: "搜索…",
    goToFile: "转到文件…",
    findInFiles: "在文件中查找…",
    closePane: "关闭面板",
    closeOtherTabs: "关闭其他标签页",
    closeAllTabs: "关闭全部标签页",
    checkForUpdates: "检查更新…",
    toggleSidebar: "切换侧栏",
    toggleSessionSidebar: "切换会话侧栏",
    inbox: "收件箱",
    notes: "便签",
    toggleTerminal: "切换终端",
    switchModel: "切换模型…",
    toggleChanges: "切换变更面板",
    zoomIn: "放大",
    zoomOut: "缩小",
    resetZoom: "重置缩放",
    showApp: "显示 MonoCode",
    quitApp: "退出 MonoCode",
  },
  shell: {
    searchConversations: "搜索对话...",
    filterSessions: "筛选会话",
    sessions: "会话",
    history: "历史",
    workspace: "工作区",
    folders: "文件夹",
    newSession: "新建会话",
    settings: "设置",
    folderActions: "文件夹操作",
    resizeSidebar: "调整侧栏宽度",
    automations: "自动化",
    projectShortcuts: "项目快捷键",
    expandProjects: "展开项目",
    search: "搜索",
    projects: "项目",
    project: "项目",
    views: "视图",
    linkedItemUpdated: "关联工作项已更新",
    working: "进行中",
    done: "已完成",
    startedByAutomation: "由自动化启动",
    draft: "草稿",
    unsavedChanges: "未保存的更改",
    closeTab: "关闭标签页",
    developmentBuild: "开发版本",
  },
  time: {
    nextRun: "下次运行 {day}, {time} {zone}",
    today: "今天 {time}",
    mutedUntil: "已静音直到 {when}",
    resetsNow: "现在重置",
    resetsIn: "{duration} 后重置",
    startedSessions: "已启动 {count} 个会话。",
  },
  composer: {
    addFilesOrMode: "添加文件或选择模式",
    stopEditingLast: "停止编辑上一条消息",
    stop: "停止",
    modelAndSettings: "模型与设置",
    recentlyUsedModels: "最近使用的模型",
    models: "模型",
    providers: "服务提供方",
    favorites: "收藏",
    searchModels: "搜索模型",
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
  transcript: {
    turnMetrics: "回合指标",
    removeDraft: "移除草稿",
    sendDraft: "发送草稿",
    copyMessage: "复制消息",
    chronologicalActivity: "按时间顺序的活动",
  },
  inbox: {
    source: "收件箱来源",
    connectSource: "连接收件箱来源",
    filter: "筛选收件箱",
    markAllRead: "全部标为已读",
    refresh: "刷新",
    resizeList: "调整收件箱列表宽度",
    title: "收件箱",
    mergePullRequest: "合并拉取请求",
    mergeOptions: "合并选项",
    mergeMethod: "合并方式",
    summary: "摘要",
    code: "代码",
    diffContext: "差异上下文",
  },
  changes: {
    title: "变更",
    branchActions: "分支操作",
    commitOptions: "提交选项",
    stagedChanges: "已暂存的变更",
    discardChanges: "放弃变更",
    unstageChanges: "取消暂存",
    stageChanges: "暂存变更",
  },
  explorer: {
    title: "资源管理器",
    newFile: "新建文件",
    newFolder: "新建文件夹",
    collapseAll: "全部折叠",
    renameHint: "输入文件名。按 Enter 确认，按 Escape 取消。",
  },
  automations: {
    title: "自动化",
    filter: "筛选自动化",
    newAutomation: "新建自动化",
    nameLabel: "自动化名称",
    untitled: "未命名",
    actions: "自动化操作",
    viewLabel: "自动化视图",
    settingsTab: "设置",
    runHistoryTab: "运行历史",
    chooseTrigger: "选择自动化触发器",
    searchTriggers: "搜索触发器",
    workingCopy: "工作副本",
    conversation: "对话",
    sessionFolder: "会话文件夹",
    missedRunGrace: "错过运行的宽限期",
    removeTrigger: "移除触发器",
    minute: "分钟",
    time: "时间",
    branch: "分支",
    selectBranch: "选择分支",
    actor: "执行者",
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
