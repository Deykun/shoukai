import { TypeNodeData } from "@/features/logic/nodes/type/start/setup";
import { RunType } from "../../types";
import {
  setPartialHandleState,
  useRunnerContextStore,
} from "../../stores/useRunnerContextStore";
import { ShoukaiShortcut } from "@/features/logic/nodes/type/schema";
import { getShortcutStatus } from "./core/shortcuts/getShortcutStatus";

type Params = {
  runType: RunType;
  nodeId: string;
  data: TypeNodeData;
};

export const executeNode = ({ nodeId, data }: Params) => {
  const searchPhrase = useRunnerContextStore.getState().global.phrase;

  const shortcuts: ShoukaiShortcut[] = data.shortcuts;

  let hasShortcutActive = false;

  shortcuts.forEach((shortcut) => {
    const shortcutStatus = getShortcutStatus(searchPhrase, shortcut);

    if (shortcutStatus.isActive) {
      // Open URL
      console.log("OPEN URL", shortcutStatus);
      setPartialHandleState({
        nodeId,
        handleId: shortcut.id,
        status: "active",
      });

      hasShortcutActive = true;
    } else {
      // Inform that halted
      console.log("REJECT", shortcutStatus);
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

  return undefined;
};
