import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Edge,
  type EdgeChange,
  type NodeChange,
  type Connection,
} from "@xyflow/react";
import { ShoukaiNode, ShoukaiNodeData } from "../nodes/type/types";
import { getDeepMerged } from "../utils/object";
import type { DeepPartial } from "../utils/typescript";
import { persist, devtools } from "zustand/middleware";
import { getNodeFromCacheIfPossible } from "./cache/getNodeFromCacheIfPossible";
import { getIsNodeDataValid } from "../nodes/utils/getIsNodeDataValid";

export type DiagramStore = {
  nodes: ShoukaiNode[];
  edges: Edge[];
  cache: {
    // React Flow's node API isn't ideal.
    // If I keep the nodes in my store, I still need to pass them as an array.
    // This micro-mapper lets me avoid iterating over the collection when it's not necessary.
    nodesIndexById: Record<string, number | undefined>;
  };
};

export const useDiagramStore = create<DiagramStore>()(
  persist(
    devtools(
      (_get, _set) => ({
        nodes: [],
        edges: [],
        cache: {
          nodesIndexById: {},
        },
      }),
      { name: "DiagramStore" },
    ),
    { name: "DiagramStore" },
  ),
);

export const onNodesChange = (changes: NodeChange<ShoukaiNode>[]) => {
  useDiagramStore.setState((state) => ({
    nodes: applyNodeChanges(changes, state.nodes),
  }));
};

export const onEdgesChange = (changes: EdgeChange<Edge>[]) => {
  useDiagramStore.setState((state) => ({
    edges: applyEdgeChanges(changes, state.edges),
  }));
};

export const onConnect = (edge: Edge | Connection) => {
  useDiagramStore.setState((state) => ({
    edges: addEdge({ ...edge, type222: "smoothstep" }, state.edges),
  }));
};

export const setNodes = (nodes: ShoukaiNode[]) => {
  useDiagramStore.setState({
    nodes,
  });
};

export const getNodes = () => {
  return useDiagramStore.getState().nodes;
};

export const addNode = (node: ShoukaiNode) => {
  useDiagramStore.setState((state) => ({
    nodes: [...state.nodes, node],
  }));
};

export const setEdges = (edges: Edge[]) => {
  useDiagramStore.setState({
    edges,
  });
};

export const getEdges = () => {
  return useDiagramStore.getState().edges;
};

export const updateNode = (
  nodeId: string,
  dataToUpdate: DeepPartial<ShoukaiNodeData>,
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

    // merge first, then validate the whole data — nested updates are partial by nature
    const mergedData = getDeepMerged(pickedNode.node.data, dataToUpdate);
    const validated = getIsNodeDataValid(pickedNode.node.type, mergedData);

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

export default useDiagramStore;
