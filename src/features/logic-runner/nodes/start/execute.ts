import { TypeNodeData } from "@/features/logic/nodes/type/start/setup";
import { RunType } from "../../types";
import {
  setPartialHandleState,
  useRunnerContextStore,
} from "../../stores/useRunnerContextStore";
import { ShoukaiShortcut } from "@/features/logic/nodes/type/schema";
import { getShortcutStatus } from "./core/shortcuts/getShortcutStatus";
import { resolveReferences } from "../../stores/actions/resolveReferences";

type Params = {
  runType: RunType;
  nodeId: string;
  data: TypeNodeData;
};

export const executeNode = ({ nodeId, data }: Params) => {
  const searchPhrase = useRunnerContextStore.getState().global.phrase;

  const shortcuts: ShoukaiShortcut[] = data.shortcuts;

  let hasShortcutActive = false;
  let urlToOpen = "";

  shortcuts.forEach((shortcut) => {
    const shortcutStatus = getShortcutStatus(searchPhrase, shortcut);

    if (shortcutStatus.isActive) {
      // Open URL
      setPartialHandleState({
        nodeId,
        handleId: shortcut.id,
        status: "active",
      });

      hasShortcutActive = true;

      const livePhrase = resolveReferences(shortcutStatus.phraseToUse);
      console.log("shortcut.phrase", shortcut.phrase);
      console.log("shortcutStatus.phraseToUse", shortcutStatus.phraseToUse);
      console.log("livePhrase", livePhrase);
      console.log(
        "s",
        resolveReferences(
          shortcutStatus.getSearchUrl(shortcutStatus.phraseToUse),
        ),
      );

      urlToOpen = shortcutStatus.getSearchUrl(livePhrase);
    } else {
      // Inform that halted
      setPartialHandleState({
        nodeId,
        handleId: shortcut.id,
        status: "rejected",
      });
    }
  });

  setPartialHandleState({
    nodeId,
    handleId: "success",
    status: hasShortcutActive ? "rejected" : "active",
  });

  return {
    hasShortcutActive,
    urlToOpen,
  };
};
