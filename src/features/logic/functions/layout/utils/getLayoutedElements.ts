import { ShoukaiNode } from "@/features/logic/nodes/type/types";
import ELK from "elkjs/lib/elk.bundled.js";
import { Edge } from "@xyflow/react";
import { getNodeSize } from "./getNodeSize";

// elk layouting options can be found here:
// https://www.eclipse.org/elk/reference/algorithms/org-eclipse-elk-layered.html
const layoutOptions = {
  "elk.algorithm": "layered",
  "elk.direction": "DOWN",
  // "elk.edgeRouting": "SPLINES",
  // "elk.layered.edgeRouting.splines.mode": "CONSERVATIVE",
  // "elk.layered.layering.strategy": "NETWORK_SIMPLEX",
  "elk.layered.spacing.nodeNodeBetweenLayers": '130',
  "elk.spacing.nodeNodeBetweenLayers": '130',
  "elk.spacing.nodeNode": '30',
  "elk.spacing.edgeEdge": '20',
  "elk.spacing.edgeNode": '50',
};

const elk = new ELK();

// uses elkjs to give each node a layouted position
export const getLayoutedNodes = async (
  nodes: ShoukaiNode[],
  edges: Edge[],
): Promise<ShoukaiNode[]> => {
  const graph = {
    id: "root",
    layoutOptions,
    children: nodes.map((node) => {
      const targetPorts = node.data.targetHandles.map((target) => ({
        id: target.id,

        // ⚠️ it's important to let elk know on which side the port is
        // in this example targets are on the left (WEST) and sources on the right (EAST)
        properties: {
          side: "NORTH",
        },
      }));

      const sourcePorts = node.data.sourceHandles.map((source) => ({
        id: source.id,
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
        // we are also passing the id, so we can also handle edges without a sourceHandle or targetHandle option
        ports: [{ id: node.id }, ...targetPorts, ...sourcePorts],
      };
    }),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.sourceHandle || edge.source],
      targets: [edge.targetHandle || edge.target],
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
