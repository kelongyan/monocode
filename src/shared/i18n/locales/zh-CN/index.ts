import type { Dictionary } from "../../dictionary";

/**
 * Simplified Chinese dictionary.
 *
 * Typed as `Dictionary`, so a missing or extra key is a compile error rather
 * than a runtime fallback.
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
    language: {
      group: "界面",
      label: "语言",
      description: "MonoCode 界面使用的语言。",
      hint: "应用于整个应用。",
    },
  },
};
