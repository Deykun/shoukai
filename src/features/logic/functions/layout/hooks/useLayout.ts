import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";

import { getLayoutedNodes } from "../utils/getLayoutedElements";
import {
  getEdges,
  getNodes,
  setNodes,
} from "@/features/logic/stores/useDiagramStore";

export default function useLayout() {
  const { fitView } = useReactFlow();

  const layout = useCallback(async () => {
    const layoutedNodes = await getLayoutedNodes(getNodes(), getEdges());

    setNodes(layoutedNodes);
    fitView();
  }, [fitView]);

  return layout;
}
