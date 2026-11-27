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
import { ShoukaiNode } from "../nodes/type/types";
import { persist, devtools } from "zustand/middleware";

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

const emptyStore: DiagramStore = {
  nodes: [],
  edges: [],
  cache: {
    nodesIndexById: {},
  },
};

export const useDiagramStore = create<DiagramStore>()(
  persist(
    devtools(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_get, _set) => ({
        ...emptyStore,
      }),
      { name: "DiagramStore" },
    ),
    { name: "DiagramStore" },
  ),
);

export const resetDiagramStore = () => {
  useDiagramStore.setState({
    ...emptyStore,
  });
};

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
    edges: addEdge(
      {
        ...edge,
        // type: "smoothstep"
      },
      state.edges,
    ),
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

export default useDiagramStore;
