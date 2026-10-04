import { useEffect } from "react";
import { useNodesInitialized } from "@xyflow/react";

import useLayout from "./useLayout";

export default function useAutoLayout() {
  const hasBeenInitialized = useNodesInitialized();
  const layout = useLayout();

  useEffect(() => {
    if (hasBeenInitialized) {
      layout();
    }
  }, [hasBeenInitialized, layout]);

  return null;
}
