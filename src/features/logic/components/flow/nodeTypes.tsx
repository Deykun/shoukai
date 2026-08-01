import { NodeTypes } from "@xyflow/react";
import { NodeRecipe } from "./nodes/NodeRecipe";
import { NodeStart } from "./nodes/NodeStart";
import { NodeOpen } from "./nodes/NodeOpen";
import { NodeIf } from "./nodes/NodeIf";

export const nodeTypes: NodeTypes = {
  start: NodeStart,
  recipe: NodeRecipe,
  open: NodeOpen,
  if: NodeIf,
  // default: NodeStart,
};
