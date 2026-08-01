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
import { ShoukaiNode } from "../types";
import { persist, devtools } from "zustand/middleware";

export type DiagramStore = {
  nodes: ShoukaiNode[];
  edges: Edge[];
};

export const useDiagramStore = create<DiagramStore>()(
  persist(
    devtools(
      (_get, _set) => ({
        nodes: [],
        edges: [],
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

export default useDiagramStore;
