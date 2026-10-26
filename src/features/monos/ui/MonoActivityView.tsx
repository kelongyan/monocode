import type { ComponentProps } from "react";
import { useT } from "../../../shared/i18n";
import { workSummaryLine } from "../../sessions/model/transcriptActivity";
import { MonoActivityTrail } from "../../sessions/ui/AgentTranscript";

/** A selected turn's trail, in the order it happened. */
export function MonoActivityView(
  trail: ComponentProps<typeof MonoActivityTrail>,
) {
  const t = useT();
  // A settled turn sums up its work; a live one's steps speak for themselves.
  const summary = trail.live ? "" : workSummaryLine(trail.blocks);
  return (
    <>
      <p className="flex min-w-0 items-center gap-1.5 px-2 pb-3 pt-1 text-[11px] leading-4 text-content/45">
        <span
          aria-hidden
          className={`size-1.5 shrink-0 rounded-full ${
            trail.live
              ? "animate-pulse bg-[var(--mono-color)]"
              : "bg-content/30"
          }`}
        />
        <span className="shrink-0 text-content/70">
          {trail.live ? t("ui.sessions.working") : t("ui.monos.finished")}
        </span>
        {summary ? <span className="truncate">· {summary}</span> : null}
      </p>
      <div className="px-1 pb-2">
        <MonoActivityTrail {...trail} />
      </div>
    </>
  );
}
