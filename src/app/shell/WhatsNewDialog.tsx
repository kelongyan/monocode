import {
  formatReleaseDate,
  presentReleaseNotes,
  releaseNotesTitle,
} from "../model/releaseNotes";
import { AgentMarkdown } from "../../features/sessions/ui/AgentMarkdown";
import { Modal } from "../../shared/ui/Modal";
import { useT } from "../../shared/i18n";

type Props = {
  version: string;
  onClose: () => void;
};

export function WhatsNewBody({ version }: { version: string }) {
  const t = useT();
  const notes = presentReleaseNotes(version);
  const title = releaseNotesTitle(version);

  return (
    <article aria-label={title} className="px-5 py-4">
      {notes?.markdown ? (
        <AgentMarkdown
          className="whats-new-md"
          text={notes.markdown}
          streaming={false}
        />
      ) : (
        <p className="text-[13px] text-content/60">
          {t("ui.shell.releaseNotesForThisVersionAre")}</p>
      )}
    </article>
  );
}

export function WhatsNewDialog({ version, onClose }: Props) {
  const t = useT();
  const notes = presentReleaseNotes(version);
  const date = notes?.date ? formatReleaseDate(notes.date) : null;

  return (
    <Modal
      onClose={onClose}
      title={t("ui.shell.whatsNew")}
      description={`MonoCode ${version}${date ? ` · ${date}` : ""}`}
      size="md"
      className="h-[min(72vh,640px)]"
    >
      <WhatsNewBody version={version} />
    </Modal>
  );
}
