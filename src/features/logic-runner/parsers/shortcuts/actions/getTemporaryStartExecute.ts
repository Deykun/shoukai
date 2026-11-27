import { executeNode } from "@/features/logic-runner/nodes/start/execute";
import { runnerContextStart } from "@/features/logic-runner/stores/useRunnerContextStore";
import { NODE_TYPE } from "@/features/logic/nodes/type/types";
import useDiagramStore from "@/features/logic/stores/useDiagramStore";

export const getTemporaryStartExecute = (phrase: string) => {
  runnerContextStart(phrase);
  const state = useDiagramStore.getState();
  const startNode = state.nodes.find((node) => node.type === NODE_TYPE.START);

  if (startNode) {
    runnerContextStart(phrase);

    const x = executeNode({
      runType: "real",
      nodeId: startNode.id,
      data: startNode.data,
    });

    console.log(x);
  }

  return {
    hasShortcutActive: false,
    urlToOpen: "",
  };
};
