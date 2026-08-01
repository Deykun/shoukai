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
import { ShoukaiNode } from "../components/flow/nodes/type/types";
import { persist, devtools } from "zustand/middleware";
import { getNodeFromCacheIfPossible } from "./cache/getNodeFromCacheIfPossible";

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
    edges: addEdge(edge, state.edges),
  }));
};

export const setNodes = (nodes: ShoukaiNode[]) => {
  useDiagramStore.setState({
    nodes,
  });
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

export const updateNode = (
  nodeId: string,
  updatedNode: Partial<ShoukaiNode>,
) => {
  useDiagramStore.setState((state) => {
    const nodeData = getNodeFromCacheIfPossible({
      nodeId,
      store: state,
    });

    if (!nodeData) {
      console.error(`Node with id ${nodeId} not found in store.`);
      return state;
    }

    console.log({
      node: nodeData.node,
    });

    return {
      ...state,
      // nodes: ,
      cache: nodeData.cache,
      nodes: state.nodes.map((node, index) =>
        index === nodeData.nodeIndex
          ? {
              ...node,
              data: {
                ...node.data,
                ...updatedNode,
              },
            }
          : node,
      ),
    };
  });
};

export default useDiagramStore;
