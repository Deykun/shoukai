import { create } from "zustand";
import { type XYPosition } from "@xyflow/react";
import { ShoukaiNode, ShoukaiNodeType } from "../types";
import { generateId } from "@/utils/ids";
import { addNode } from "./useDiagramStore";
// import type { SupportedNodeTypes } from "@ts";
// import { generateId } from "@/utils/generateId";
// import { addNode } from "@/versions/diagram-4-zustand-actions/stores/useGlobalStore";

import { defaultData as defaultDataNodeStart } from "../components/flow/nodes/NodeStart";
import { defaultData as defaultDataNodeRecipe } from "../components/flow/nodes/NodeRecipe";
import { defaultData as defaultDataNodeOpen } from "../components/flow/nodes/NodeOpen";
import { defaultData as defaultDataNodeIf } from "../components/flow/nodes/NodeIf";

const defaultDataByNode: Record<ShoukaiNodeType, ShoukaiNode["data"]> = {
  start: defaultDataNodeStart,
  recipe: defaultDataNodeRecipe,
  open: defaultDataNodeOpen,
  if: defaultDataNodeIf,
};

export type DragAndDropStoreState = {
  draggedType: ShoukaiNodeType | null;
};

const useDragAndDropStore = create<DragAndDropStoreState>(() => ({
  draggedType: null,
}));

export const setDraggedType = (
  draggedType: DragAndDropStoreState["draggedType"],
) => {
  useDragAndDropStore.setState({
    draggedType,
  });
};

export const addNodeOnDropIfDragged = (position: XYPosition) => {
  const draggedType = useDragAndDropStore.getState().draggedType;

  if (!draggedType) {
    return;
  }

  const newNode = {
    id: generateId(draggedType),
    type: draggedType,
    position,
    data: defaultDataByNode[draggedType],
  } as ShoukaiNode;

  addNode(newNode);

  useDragAndDropStore.setState({
    draggedType: null,
  });
};

export default useDragAndDropStore;
