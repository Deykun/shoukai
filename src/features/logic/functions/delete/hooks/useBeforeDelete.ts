import { openConfirm } from "@/features/confirm/stores/useConfirmStore";
import { ShoukaiNode } from "@/features/logic/nodes/type/types";
import { Edge, OnBeforeDelete } from "@xyflow/react";
import { useCallback } from "react";

export default function useBeforeDelete() {
  const onBeforeDelete: OnBeforeDelete<ShoukaiNode, Edge> = useCallback(
    async ({ nodes, edges }) => {
      if (nodes.length === 0 && edges.length === 0) {
        return false;
      }

      return openConfirm({
        title: `Remove`,
        content: `Do you want to remove (${nodes.length} nodes and ${edges.length} edges)?`,
      });
    },
    [],
  );

  return onBeforeDelete;
}
