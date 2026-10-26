import { t, type MessageKey } from "../../../shared/i18n";
import type { AgentModel, ModelSetting, ModelSettingChoice } from "./models";

/**
 * Model settings carry stable English labels from `models.ts` and the live
 * catalogs; the picker renders them through the dictionary keyed by setting
 * id and choice value, falling back to the original label for anything the
 * dictionary does not cover (host-provided settings, new provider knobs).
 */
const SETTING_KEYS: Partial<Record<string, MessageKey>> = {
  effort: "composer.modelSettings.effort",
  serviceTier: "composer.modelSettings.serviceTier",
  fast: "composer.modelSettings.fast",
  thinking: "composer.modelSettings.thinking",
  context: "composer.modelSettings.context",
};

const CHOICE_KEYS: Partial<Record<string, MessageKey>> = {
  "effort.xhigh": "composer.modelSettings.choices.effort.xhigh",
  "effort.high": "composer.modelSettings.choices.effort.high",
  "effort.medium": "composer.modelSettings.choices.effort.medium",
  "effort.low": "composer.modelSettings.choices.effort.low",
  "effort.max": "composer.modelSettings.choices.effort.max",
  "effort.ultracode": "composer.modelSettings.choices.effort.ultracode",
  "effort.ultrathink": "composer.modelSettings.choices.effort.ultrathink",
  "effort.none": "composer.modelSettings.choices.effort.none",
  "effort.minimal": "composer.modelSettings.choices.effort.minimal",
  "serviceTier.default": "composer.modelSettings.choices.serviceTier.default",
  "serviceTier.fast": "composer.modelSettings.choices.serviceTier.fast",
};

/** Placeholder model entries whose display names are not product names. */
const MODEL_NAME_KEYS: Partial<Record<string, MessageKey>> = {
  "pi:default": "composer.modelSettings.models.default",
  "omp:default": "composer.modelSettings.models.default",
  "hermes:default": "composer.modelSettings.models.configured",
  "devin:adaptive": "composer.modelSettings.models.adaptive",
};

export function modelSettingLabel(setting: ModelSetting): string {
  const key = SETTING_KEYS[setting.id];
  return key ? t(key) : setting.label;
}

export function modelChoiceLabel(
  setting: ModelSetting,
  choice: ModelSettingChoice,
): string {
  if (setting.kind === "toggle") {
    return t(
      choice.value === "true"
        ? "composer.modelSettings.choices.toggle.true"
        : "composer.modelSettings.choices.toggle.false",
    );
  }
  const key = CHOICE_KEYS[`${setting.id}.${choice.value}`];
  return key ? t(key) : choice.label;
}

export function modelNameLabel(model: Pick<AgentModel, "id" | "name">): string {
  const key = MODEL_NAME_KEYS[model.id];
  return key ? t(key) : model.name;
}
