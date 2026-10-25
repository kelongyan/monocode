/**
 * English dictionary — the source of truth for every translatable string.
 *
 * `Dictionary` is derived from this object, so adding a key here makes
 * `tsc` demand it from every other locale. Keep keys grouped by feature to
 * match `src/features/`; one file per feature once the surface grows.
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
    language: {
      group: "Interface",
      label: "Language",
      description: "The language MonoCode uses for its interface.",
      hint: "Applies to the whole app.",
    },
  },
};
