import { NodeTypes } from "@xyflow/react";
import { NodeRecipe } from "./nodes/NodeRecipe";
import { NodeShortcut } from "./nodes/NodeShortcut";
import { NodeStart } from "./nodes/NodeStart";

export const nodeTypes: NodeTypes = {
  start: NodeStart,
  shortcut: NodeShortcut,
  recipe: NodeRecipe,
  // default: NodeStart,
};


