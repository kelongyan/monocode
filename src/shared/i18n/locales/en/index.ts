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
