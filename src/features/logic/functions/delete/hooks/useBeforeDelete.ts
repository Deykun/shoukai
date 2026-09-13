import { ShoukaiNode } from "@/features/logic/nodes/type/types";
import { Edge, OnBeforeDelete } from "@xyflow/react";
import { useCallback } from "react";

export default function useBeforeDelete() {
  const onBeforeDelete: OnBeforeDelete<ShoukaiNode, Edge> = useCallback(
    async ({ nodes, edges }) => {
      return confirm(
        `Do you want to remove (${nodes.length} nodes and ${edges.length} edges)?`,
      );
    },
    [],
  );

  return onBeforeDelete;
}
