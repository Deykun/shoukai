import { ShoukaiNode } from "@/features/logic/nodes/type/types";
import ELK from "elkjs/lib/elk.bundled.js";
import { Edge } from "@xyflow/react";
import { getNodeSize } from "./getNodeSize";

// elk layouting options can be found here:
// https://www.eclipse.org/elk/reference/algorithms/org-eclipse-elk-layered.html
const layoutOptions = {
  "elk.algorithm": "layered",
  "elk.direction": "DOWN",
  "elk.layered.spacing.nodeNodeBetweenLayers": "80",
  "elk.spacing.nodeNodeBetweenLayers": "80",
  "elk.spacing.nodeNode": "50",
  "elk.spacing.edgeEdge": "50",
  "elk.spacing.edgeNode": "50",
  // https://github.com/xyflow/xyflow/discussions/4248#discussioncomment-12840414
  "elk.layered.nodePlacement.strategy": "BRANDES_KOEPF",
  "elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
  "elk.layered.considerModelOrder.portModelOrder": "true",
  "elk.layered.considerModelOrder.strategy": "NODES_AND_EDGES",
  "elk.layered.crossingMinimization.forceNodeModelOrder": "true",
  "elk.layered.compaction.connectedComponents": "true",
  "elk.layered.compaction.postCompaction.strategy": "EDGE_LENGTH",
  "elk.layered.cycleBreaking.strategy": "MODEL_ORDER",
  "elk.separateConnectedComponents": "false", // Keeps them bound to global direction rules
  "elk.aspectRatio": "0.1", // Forces a very tall, narrow layout if components separate
};

const elk = new ELK();

// handle ids ("target", "success", "error") repeat across nodes,
// elk needs globally unique port ids
const getPortId = (nodeId: string, handleId?: string | null) =>
  handleId ? `${nodeId}__${handleId}` : nodeId;

// uses elkjs to give each node a layouted position
export const getLayoutedNodes = async (
  nodes: ShoukaiNode[],
  edges: Edge[],
): Promise<ShoukaiNode[]> => {
  const graph = {
    id: "root",
    layoutOptions,
    children: nodes.map((node) => {
      // targets on top (NORTH), sources on bottom (SOUTH)
      const targetPorts = node.data.targetHandles.map((target) => ({
        id: getPortId(node.id, target.id),
        properties: {
          side: "NORTH",
        },
      }));

      const sourcePorts = node.data.sourceHandles.map((source) => ({
        id: getPortId(node.id, source.id),
        properties: {
          side: "SOUTH",
        },
      }));

      const size = getNodeSize(node.id);

      return {
        id: node.id,
        width: size?.width || 200,
        height: size?.height || 100,
        // ⚠️ we need to tell elk that the ports are fixed, in order to reduce edge crossings
        properties: {
          "org.eclipse.elk.portConstraints": "FIXED_ORDER",
        },
        // fallback port for edges without sourceHandle/targetHandle
        // (target handles have no id in JSX, so it's used as a target -> NORTH)
        ports: [
          { id: node.id, properties: { side: "NORTH" } },
          ...targetPorts,
          ...sourcePorts,
        ],
      };
    }),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [getPortId(edge.source, edge.sourceHandle)],
      targets: [getPortId(edge.target, edge.targetHandle)],
    })),
  };

  const layoutedGraph = await elk.layout(graph);

  const layoutedNodes: ShoukaiNode[] = nodes.map((node) => {
    const layoutedNode = layoutedGraph.children?.find(
      (lgNode) => lgNode.id === node.id,
    );

    return {
      ...node,
      position: {
        x: layoutedNode?.x ?? 0,
        y: layoutedNode?.y ?? 0,
      },
    };
  });

  return layoutedNodes;
};
