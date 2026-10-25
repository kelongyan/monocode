/**
 * English dictionary — the source of truth for every translatable string.
 *
 * `Dictionary` is derived from this object, so adding a key here makes
 * `tsc` demand it from every other locale. Keep keys grouped by feature to
 * match `src/features/`; one file per feature once the surface grows.
 *
 * Do not add `as const`: it would turn each value into a literal type and
 * every other locale would then fail to assign its translation.
 *
 * `settings.entries` keys are the setting ids from `SETTINGS_INDEX`, so the
 * index can look its own labels up without a second name mapping.
 */
export const en = {
  common: {
    close: "Close",
    cancel: "Cancel",
    save: "Save",
    /** `name` is an account or device label. */
    renameNamed: "Rename {name}",
    removeNamed: "Remove {name}",
  },
  settings: {
    groups: {
      app: "App",
      agents: "Agents",
      workspace: "Workspace",
    },
    /** The Settings window title. */
    title: "Settings",
    sections: {
      general: {
        label: "General",
        description:
          "The build you are running, how MonoCode reaches you, and the panels it shows.",
        keywords: "version update sounds notifications notes rail",
      },
      connections: {
        label: "Connections",
        description: "Run agents on your other machines.",
        keywords: "ssh remote host machine server environment always on",
      },
      appearance: {
        label: "Appearance",
        description:
          "Theme, tint, translucency, workspace layout, and conversation backgrounds.",
        keywords:
          "theme dark light color accent glass blur zoom scale wallpaper rail sidebar",
      },
      keybindings: {
        label: "Keybindings",
        description:
          "Every shortcut the workspace handles, from the app menu and the key handler.",
        keywords: "shortcut hotkey keyboard binding",
      },
      chat: {
        label: "Chat",
        description:
          "How transcripts read, what the composer does with a follow-up, how files save, and how diffs open.",
        keywords:
          "transcript composer prompt message diff review layout format save editor",
      },
      providers: {
        label: "Providers",
        description:
          "Provider accounts, agent CLIs MonoCode can drive, and the model new sessions start with.",
        keywords:
          "account sign in login model harness claude codex gemini cli default hooks",
      },
      mcp: {
        label: "MCP",
        description:
          "Find MCP servers across providers and manage their connections.",
        keywords:
          "tools servers connections oauth authenticate login claude codex cursor opencode",
      },
      skills: {
        label: "Skills",
        description:
          "Discover and manage file skills from project, personal, and harness folders.",
        keywords: "skill instructions prompt",
      },
      monos: {
        label: "Monos",
        description:
          "The resident agent beside your tabs, and which projects have one.",
        keywords: "mono resident agent mascot claim project title bar",
      },
      inbox: {
        label: "Inbox",
        description:
          "Manage Inbox services and notification preferences for each project.",
        keywords:
          "github gitlab linear jira atlassian azure devops connect token integration",
      },
      archive: {
        label: "Archive",
        description: "Projects and conversations you have archived.",
        keywords: "archived restore delete hidden",
      },
      worktrees: {
        label: "Worktrees",
        description: "Manage additional worktrees for each project.",
        keywords: "git branch worktree working copy project create delete",
      },
    },
    entries: {
      "remote-machines": {
        label: "Your machines",
        keywords: "ssh remote connect host server environment",
      },
      "mcp-servers": {
        label: "MCP servers",
        keywords: "claude tools connections oauth authenticate login add remove",
      },
      "monos-enabled": {
        label: "Show monos",
        keywords: "mono agent rail hide",
      },
      "rail-monos-pinned": {
        label: "Pin monos to the icon rail",
        keywords: "mono rail compact collapsed icons top divider project picker",
      },
      "mono-list": {
        label: "Your monos",
        keywords:
          "mono reset soul name projects sessions sidebar visibility hidden show",
      },
      "project-worktrees": {
        label: "Project worktrees",
        keywords: "git branch working copy create delete manage",
      },
      update: {
        label: "Version",
        keywords: "update upgrade release what's new build changelog",
      },
      sounds: {
        label: "Sounds",
        keywords: "audio cue chime mute volume",
      },
      notifications: {
        label: "Notifications",
        keywords: "notify alert toast permission reminder background",
      },
      notes: {
        label: "Notes",
        keywords: "notebook markdown rail scratchpad",
      },
      "quick-composer": {
        label: "Quick composer",
        keywords: "spotlight global shortcut hotkey floating prompt anywhere",
      },
      "working-agents": {
        label: "Working agents",
        keywords: "live running sessions rail card",
      },
      "file-tabs": {
        label: "File tabs",
        keywords: "editor open top workspace normal session pane beside chat",
      },
      "tab-animations": {
        label: "Tab animations",
        keywords: "motion open close resize transition",
      },
      "close-to-tray": {
        label: "Close to tray",
        keywords: "minimize background quit exit window taskbar windows",
      },
      language: {
        label: "Language",
        keywords: "locale translation english chinese 语言 中文",
      },
      theme: {
        label: "Theme",
        keywords: "dark light system appearance mode",
      },
      "workspace-theme": {
        label: "Workspace theme",
        keywords:
          "color colour palette scheme preset inset harbor moss ember orchid",
      },
      "accent-color": {
        label: "Accent color",
        keywords: "highlight bubble send button tint",
      },
      "diff-colors": {
        label: "Diff colors",
        keywords:
          "colorblind color blind accessibility added removed red green blue orange high contrast changes",
      },
      hue: {
        label: "Hue",
        keywords: "tint color chrome",
      },
      saturation: {
        label: "Saturation",
        keywords: "tint color neutral grey gray",
      },
      "dark-lightness": {
        label: "Dark-mode lightness",
        keywords: "black brightness contrast background",
      },
      "inset-glass": {
        label: "Transparent window",
        keywords:
          "glass inset translucent transparency opaque desktop blur layout",
      },
      "sidebar-opacity": {
        label: "Sidebar opacity",
        keywords: "glass translucent transparency vibrancy",
      },
      blur: {
        label: "Blur radius",
        keywords: "glass translucent vibrancy backdrop",
      },
      "main-pane-glass": {
        label: "Main pane glass",
        keywords: "translucent transparency body window",
      },
      "inset-layout": {
        label: "New layout",
        keywords:
          "classic preview sidebar navigation tabs inset workspace card rounded floating linear frame",
      },
      "interface-scale": {
        label: "Interface scale",
        keywords: "zoom font size bigger smaller ui",
      },
      "collapsed-project-rail": {
        label: "Collapsed project rail",
        keywords: "sidebar compact icons hidden navigation layout",
      },
      "show-excluded-files": {
        label: "Show excluded files",
        keywords: "explorer gitignore ignored hidden files tree",
      },
      "chat-background": {
        label: "Chat background",
        keywords: "wallpaper image picture opacity backdrop",
      },
      "transcript-layout": {
        label: "Transcript layout",
        keywords: "full width chat bubble message",
      },
      "anchor-prompts": {
        label: "Anchor prompts to top",
        keywords: "scroll position sticky message",
      },
      "paced-reveal": {
        label: "Smooth text reveal",
        keywords: "streaming pacing immediate latency performance animation",
      },
      "follow-up": {
        label: "Follow-up behavior",
        keywords: "queue steer interrupt send while running",
      },
      "model-controls": {
        label: "Model controls",
        keywords:
          "effort thinking reasoning fast service tier model picker composer",
      },
      "composer-autocorrect": {
        label: "Autocorrect",
        keywords: "spelling spell check autocorrect typo macos composer",
      },
      "composer-mascot": {
        label: "Composer mascot",
        keywords: "runner animation coin fun",
      },
      "format-on-save": {
        label: "Format on save",
        keywords: "prettier quotes editor save format",
      },
      "diff-view": {
        label: "Diff view",
        keywords: "unified editor review changes working tree",
      },
      "empty-session-games": {
        label: "Empty session games",
        keywords: "pacman snake arcade grid fun",
      },
      "agent-clis": {
        label: "Agent CLIs",
        keywords:
          "codex opencode cursor grok pi omp fx hermes antigravity devin binary path",
      },
      "provider-accounts": {
        label: "Provider accounts",
        keywords:
          "account sign in login rename remove delete credentials profile usage limit quota exhausted",
      },
      "show-remaining-usage": {
        label: "Show remaining usage",
        keywords: "usage limit meter bar left used quota percent",
      },
      "mask-emails": {
        label: "Mask account emails",
        keywords: "email privacy blur hide screenshot account",
      },
      "claude-hooks": {
        label: "Claude Code hooks",
        keywords: "pretooluse settings.json block command notification",
      },
      "idle-agents": {
        label: "Keep idle agents ready",
        keywords: "memory ram cpu performance process warm park background",
      },
      "project-notifications": {
        label: "Project notifications",
        keywords: "mute resume sounds banners reminders categories",
      },
      github: {
        label: "GitHub",
        keywords: "gh cli connect pull request sign in",
      },
      gitlab: {
        label: "GitLab",
        keywords: "token self-managed merge request connect",
      },
      azuredevops: {
        label: "ADO",
        keywords: "azure devops boards repos pull request pat organization connect",
      },
      jira: {
        label: "Jira",
        keywords: "atlassian cloud site email api token issues projects connect",
      },
      linear: {
        label: "Linear",
        keywords: "api key issues teams connect",
      },
      "show-archived": {
        label: "Show archived in the sidebar",
        keywords: "hidden conversations list",
      },
    },
    language: {
      group: "Interface",
      label: "Language",
      description: "The language MonoCode uses for its interface.",
      hint: "Applies to the whole app.",
    },
    /** Shared picker option labels. */
    options: {
      system: "System",
      dark: "Dark",
      light: "Light",
      default: "Default",
      colorblind: "Colorblind",
      highContrast: "High contrast",
    },
    /** Small status words reused across pages. */
    status: {
      connected: "Connected",
      signInRequired: "Sign in required",
      notInstalled: "Not installed",
      saving: "Saving",
      connect: "Connect",
    },
    /** Settings search box. */
    search: {
      placeholder: "Search settings",
      clear: "Clear settings search",
      results: "Settings search results",
      filter: "Filter",
    },
    /** Per-section page copy. Keys mirror the section ids. */
    pages: {
      general: {
        alertsTitle: "Alerts",
        alertsDescription:
          "How MonoCode reaches you while you are looking somewhere else.",
        soundsLabel: "Sounds",
        soundsDescription:
          "Short cues for project activity, finished turns, and available updates. Choose project notification categories in Inbox settings. Switches and Copy on a finished turn also play.",
        notificationsLabel: "Notifications",
        notificationsDescription:
          "Notify when a reminder is due, or when an agent finishes or needs input in another session or while MonoCode is in the background. Click the notification to open that session.",
        workspaceTitle: "Workspace",
        workspaceDescription:
          "How project navigation and workspace tabs behave.",
        fileTabsLabel: "File tabs",
        fileTabsDescription:
          "Open files beside the active chat, or give each file a normal tab in the top bar. Top-bar files can still be combined into split panes.",
        tabAnimationsLabel: "Tab animations",
        tabAnimationsDescription:
          "Animate tabs as they open and close. Turn this off for instant tab changes.",
        notesLabel: "Notes",
        notesDescription:
          "A global markdown notebook on the project rail. Save a finished turn from the transcript, then mention it later with @note or add it to chat.",
        quickComposerLabel: "Quick composer",
        workingAgentsLabel: "Working agents",
        workingAgentsDescription:
          "When two or more chats are in flight, a card on the project rail lists them so you can jump across projects. Finished turns stay until you open that session.",
        closeToTrayLabel: "Close to tray",
        closeToTrayDescription:
          "Closing a window hides it to the system tray instead of quitting, so running agents keep going. Reopen from the tray icon, and quit for real from its menu. Turn this off to have close end the window.",
        aboutTitle: "About",
      },
      chat: {
        transcriptTitle: "Transcript",
        transcriptDescription: "How a conversation reads as it grows.",
        transcriptLayoutLabel: "Transcript layout",
        transcriptLayoutDescription:
          "Full width keeps user prompts as a spanning card. Chat aligns them to the right with a max width, like a messaging app.",
        anchorPromptsLabel: "Anchor prompts to top",
        anchorPromptsDescription:
          "When you send, the new prompt sits at the top of the transcript and the reply grows into the space below. Turn this off to keep the classic layout, with the latest message resting on the composer.",
        pacedRevealLabel: "Smooth text reveal",
        pacedRevealDescription:
          "Reveal incoming bursts gradually. Turn this off to show received text immediately. This changes presentation timing, not processing speed.",
        composerTitle: "Composer",
        composerDescription: "What the composer does with what you type.",
        followUpLabel: "Follow-up behavior",
        followUpDescription:
          "Queue follow-ups until the active turn finishes, or steer the active turn immediately.",
        modelControlsLabel: "Model controls",
        modelControlsDescription:
          "Show model options beside the picker instead of inside the model menu.",
        autocorrectLabel: "Autocorrect",
        autocorrectDescription:
          "Spell check and autocorrect prompts in session and mono composers. Turn this off to keep the text exactly as typed.",
        editorTitle: "Editor",
        editorDescription:
          "What happens when you save a file in the workspace editor.",
        formatOnSaveLabel: "Format on save",
        formatOnSaveDescription:
          "Run Prettier on supported files before writing. Off keeps the text you typed, including quote style.",
        reviewTitle: "Code review",
        reviewDescription:
          "Where a turn's changes open when you go to read them.",
        diffViewLabel: "Diff view",
        diffViewDescription:
          "Editor keeps working-tree changes in the file. Unified stacks every changed file in one review, with sticky headers and collapsed unchanged lines.",
        extrasTitle: "Extras",
        extrasDescription:
          "Idle animation, and nothing else. Turn both off for a still workspace.",
        composerMascotLabel: "Composer mascot",
        composerMascotDescription:
          "When a turn is running, the project mascot runs along the composer, bonks the scroll-to-latest button the first time, then jumps it, and sometimes grabs a coin.",
        emptySessionGamesLabel: "Empty session games",
        emptySessionGamesDescription:
          "Pac-man and snake idle on the empty-session grid. Hover the band to take control of whichever is on screen. Turn this off to keep the pane still.",
      },
      appearance: {
        themeTitle: "Theme",
        themeDescriptionInset:
          "Each workspace theme has its own dark and light palette.",
        themeDescriptionClassic:
          "Dark and light share the same tint, so the color settings below apply to both.",
        themeHint: "System follows the OS appearance.",
        workspaceThemeDescription:
          "Colors for the inset workspace's shell, card, text and accent. Each theme has a dark and a light palette.",
        insetGlassLinux: "The window stays opaque on Linux.",
        insetGlassLight:
          "Light mode keeps the window opaque. Your dark-mode choice is remembered.",
        insetGlassHint:
          "Show the desktop through the window. Turn off to keep the window opaque.",
        accentColorDescription:
          "Used for the composer send button and your message bubbles.",
        diffColorsDescription:
          "Colors for added and removed lines. Colorblind and High contrast use blue and orange instead of green and red; High contrast adds stronger tints and text.",
        colorTitle: "Color",
        colorDescription:
          "Hue and saturation tint every surface. Lightness only moves the dark theme.",
        hueDescription: "Base hue for accents and tinted surfaces.",
        saturationDescription:
          "How strongly the hue tints the interface. Zero keeps it neutral.",
        translucencyTitle: "Translucency",
        sidebarOpacityDescription:
          "Applies to the project rail and the other glass panes.",
        blurDescription: "Background blur behind the window.",
        mainPaneGlassDescription:
          "Extend the translucent treatment to the main pane behind sessions and editors.",
        layoutTitle: "Layout",
        insetLayoutDescription:
          "Use the redesigned sidebar, project switcher, workspace tabs and right panel. Turn off to return to the classic layout.",
        collapsedRailDescription:
          "Keep project navigation available as a compact icon rail, or hide the rail completely.",
        interfaceScaleDescription:
          "Zoom the whole interface. You can also use Ctrl+=, Ctrl+-, and Ctrl+0 (Cmd on macOS).",
        showExcludedFilesDescription:
          "Show files and folders Git excludes, such as build output and dependencies, in the explorer.",
      },
      inbox: {
        githubDescription:
          "Pull requests, reviews, and issues, read through the GitHub CLI.",
        gitlabDescription:
          "Merge requests from GitLab.com or a self-managed instance.",
        azureDescription:
          "Pull requests and Boards work items from your ADO organization.",
        jiraDescription: "Jira Cloud issues from the projects you pick.",
        linearDescription: "Issues assigned to you, from the teams you pick.",
        githubReady:
          "GitHub CLI is installed and authenticated. MonoCode uses it for GitHub inbox items.",
        githubNeedsLogin:
          "Run gh auth login in a terminal, complete the sign-in flow, then check again.",
        githubMissing:
          "Install GitHub CLI from cli.github.com, run gh auth login in a terminal, then check again.",
        gitlabConnectDescription:
          "Connect GitLab.com or a self-managed GitLab instance. Use a personal access token with API access; the token is stored locally and Disconnect deletes it.",
        azureConnectDescription:
          "Connect your ADO organization with a personal access token (Boards + Repos read & write for comments). The token is stored locally and Disconnect deletes it.",
        linearConnectDescription:
          "Create a personal API key in Linear → Settings → Security & Access. Disconnect deletes it.",
        connectionLabel: "Connection",
        apiKeyLabel: "API key",
        gitlabUrlLabel: "GitLab URL",
        gitlabTokenLabel: "GitLab access token",
        azureUrlLabel: "Azure DevOps organization URL",
        azureTokenLabel: "Azure DevOps personal access token",
        linearKeyLabel: "Linear API key",
        checkingForUpdates: "Checking for updates…",
        updateCheckFailed: "Update check failed.",
        updateFeedHint: "MonoCode updates itself from the release feed.",
        download: "Download",
        checkForUpdates: "Check for updates",
      },
      keybindings: {
        groupTitle: "Shortcuts",
        groupDescription:
          "Click a shortcut to record new keys. Press Delete while recording to disable it.",
        filterLabel: "Filter keybindings",
        commandColumn: "Command",
        bindingOne: "binding",
        bindingOther: "bindings",
      },
      providers: {
        agentClisTitle: "Agent CLIs",
        defaultsScopeLabel: "Provider defaults scope",
        advancedTitle: "Advanced",
        idleAgentsLabel: "Keep idle agents ready",
        idleAgentsDescription:
          "A finished conversation keeps its agent CLI running for a few minutes, so a follow-up starts instantly. Each one can hold a few hundred MB of memory. Past this many, the one idle longest stops early; it resumes on your next message after a short restart. Choose None on a machine short on memory.",
        claudeHooksLabel: "Claude Code hooks",
        claudeHooksDescription:
          "Run the hooks configured in your settings.json files — PreToolUse command rewrites, blocks, notifications, and the rest — just as the Claude Code CLI would. Turn this off if a hook is misbehaving and you need the session back. Takes effect on the next turn.",
        usageTitle: "Usage and privacy",
        showRemainingUsageLabel: "Show remaining usage",
        showRemainingUsageDescription:
          "Fill usage meters with what is left in each limit instead of what has been used.",
        maskEmailsLabel: "Mask account emails",
        maskEmailsDescription:
          "Blur account emails in Settings and the usage popover until you click one, so they stay out of screenshots.",
        accountsTitle: "Accounts",
        accountsDescription:
          "Create isolated sign-ins for providers that support account profiles. Account switching stays available from the usage control in the footer.",
        renameAccountTitle: "Rename account",
        removeAccountTitle: "Remove account",
        invalidVersion: "{provider} CLI returned an invalid version.",
        tooOld: "OpenCode v{version} is too old. Upgrade to v{minimum} or newer.",
      },
      archive: {
        title: "Archived projects",
        description:
          "Archive a project from the rail to keep its chats without listing it in the sidebar.",
        showArchivedLabel: "Show archived in the sidebar",
        showArchivedDescription:
          "Keep archived conversations listed alongside the active ones.",
      },
      monos: {
        groupTitle: "Monos",
        enabledLabel: "Show monos",
        enabledDescription:
          "Agents of your own on the project rail. Each works on the projects you give it, remembers what matters and picks up habits it runs on its own. Turn this off to hide them.",
        pinnedLabel: "Pin monos to the icon rail",
        pinnedDescription:
          "When the project rail is collapsed to icons, show each Mono at the top of the rail, above a divider, instead of inside the project picker.",
        menuBarLabel: "Menu bar icon",
        menuBarDescription:
          "Chat with a Mono or open the quick composer from the macOS menu bar. Turn this off to hide the icon.",
        listTitle: "Your monos",
        listDescription:
          "Choose whether new sessions started by each Mono appear in the sidebar. Hidden sessions remain saved and can be opened from the Mono's chat. Add a Mono with the plus on the rail and choose its projects from its details.",
        resetLabel: "Reset Mono",
        resetDefaultsTitle: "Reset to defaults",
      },
      chatBackground: {
        title: "Chat background",
        description:
          "An image behind your chat panes. It stays on this device.",
        effectLabel: "Background effect",
        showOnLabel: "Show on",
        showOnDescription: "Empty sessions only, or every conversation.",
        showBackgroundOnLabel: "Show background on",
        emptyVisibilityLabel: "Empty chat visibility",
        emptyVisibilityDescription:
          "Background strength before a chat has messages.",
        emptyBackgroundVisibilityLabel: "Empty chat background visibility",
        sessionVisibilityLabel: "Session visibility",
        sessionVisibilityDescription:
          "Background strength once the conversation has messages.",
        sessionBackgroundVisibilityLabel: "Session background visibility",
      },
    },
  },
  /** Window chrome buttons. */
  window: {
    minimize: "Minimize",
    minimizeWindow: "Minimize window",
    maximize: "Maximize",
    maximizeWindow: "Maximize window",
    restore: "Restore",
    restoreWindow: "Restore window",
    closeWindow: "Close window",
  },
  /** Access picker. */
  accessPicker: {
    busyTitle: "Changes apply to the next turn.",
    busyHint:
      "Access changes apply to the next turn. Stop and resend to apply them now.",
  },
  /** Runtime permission modes, shown on the access picker and in Settings. */
  runtimeMode: {
    supervised: {
      label: "Supervised",
      hint: "Ask before commands and file changes.",
    },
    "auto-accept-edits": {
      label: "Auto-accept edits",
      hint: "Auto-approve edits, ask before other actions.",
    },
    auto: {
      label: "Auto",
      hint: "An AI reviewer can approve or deny actions.",
    },
    "full-access": {
      label: "Full access",
      hint: "Allow commands, edits, and supported MCP confirmations in non-plan turns without prompts.",
    },
  },
};
