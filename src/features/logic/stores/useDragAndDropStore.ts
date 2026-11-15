import { create } from "zustand";
import { type XYPosition } from "@xyflow/react";

import { generateId } from "@/utils/ids";
import { addNode } from "./useDiagramStore";
import { defaultDataByNodeType } from "../nodes/type/nodeTypes";
import { ShoukaiNode, ShoukaiNodeType } from "../nodes/type/types";

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
    data: defaultDataByNodeType[draggedType],
  } as ShoukaiNode;

  addNode(newNode);

  useDragAndDropStore.setState({
    draggedType: null,
  });
};

export default useDragAndDropStore;
