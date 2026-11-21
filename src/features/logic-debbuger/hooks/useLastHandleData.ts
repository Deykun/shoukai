import { useRunnerContextStore } from "@/features/logic-runner/stores/useRunnerContextStore";

export const useLastHandleData = (nodeId: string, handleId: string) =>
  useRunnerContextStore((state) => state.nodes[nodeId]?.[handleId]?.at(-1));
