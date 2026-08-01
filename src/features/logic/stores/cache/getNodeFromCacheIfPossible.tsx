import { ShoukaiNode } from "../../types";
import { DiagramStore } from "../useDiagramStore";

type Params = { nodeId: string; store: DiagramStore };
type Response =
  | { node: ShoukaiNode; nodeIndex: number; cache: DiagramStore["cache"] }
  | undefined;

export const getNodeFromCacheIfPossible = ({
  nodeId,
  store,
}: Params): Response => {
  if (store.cache.nodesIndexById[nodeId] !== undefined) {
    const nodeIndex = store.cache.nodesIndexById[nodeId];

    if (nodeIndex !== undefined) {
      const nodeFromCache = store.nodes[nodeIndex];

      if (nodeFromCache.id === nodeId) {
        return { node: nodeFromCache, nodeIndex, cache: store.cache };
      }
    }
  }

  const nodeIndex = store.nodes.findIndex((node) => node.id === nodeId);
  if (nodeIndex !== -1) {
    const nodeFromCache = store.nodes[nodeIndex];

    if (nodeFromCache.id === nodeId) {
      return {
        node: nodeFromCache,
        nodeIndex,
        cache: {
          ...store.cache,
          nodesIndexById: {
            ...store.cache.nodesIndexById,
            [nodeId]: nodeIndex,
          },
        },
      };
    }
  }

  return undefined;
};
