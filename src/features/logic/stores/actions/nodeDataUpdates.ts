import { ShoukaiNodeData } from "../../nodes/type/types";
import { getIsNodeDataValid } from "../../nodes/utils/getIsNodeDataValid";
import { getDeepMerged, getWithoutPath } from "../../utils/object";
import type { DeepPartial, ObjectPath } from "../../utils/typescript";
import { getNodeFromCacheIfPossible } from "../cache/getNodeFromCacheIfPossible";
import useDiagramStore from "../useDiagramStore";

const setNodeData = (
  nodeId: string,
  getNextData: (data: ShoukaiNodeData) => unknown,
) => {
  useDiagramStore.setState((state) => {
    const pickedNode = getNodeFromCacheIfPossible({
      nodeId,
      store: state,
    });

    if (!pickedNode) {
      console.error(`Node with id ${nodeId} not found in store.`);
      return state;
    }

    // change first, then validate the whole data — nested updates are partial by nature
    const nextData = getNextData(pickedNode.node.data);
    const validated = getIsNodeDataValid(pickedNode.node.type, nextData);

    if (!validated.success) {
      console.error(`Invalid data for node with id ${nodeId}.`);
      return state;
    }

    return {
      ...state,
      cache: pickedNode.cache,
      nodes: state.nodes.map((node, index) =>
        index === pickedNode.nodeIndex
          ? {
              ...node,
              data: validated.data,
            }
          : node,
      ),
    };
  });
};

export const updateNode = (
  nodeId: string,
  dataToUpdate: DeepPartial<ShoukaiNodeData>,
) => {
  setNodeData(nodeId, (data) => getDeepMerged(data, dataToUpdate));
};

// updateNode only merges, so it can't drop keys
export const removeNodeDataPath = (
  nodeId: string,
  path: ObjectPath<ShoukaiNodeData>,
) => {
  setNodeData(nodeId, (data) => getWithoutPath(data, path));
};
