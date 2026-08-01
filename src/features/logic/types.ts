import { TypeNode as TypeNodeStart } from "./components/flow/nodes/NodeStart";
import { TypeNode as TypeNodeRecipe } from "./components/flow/nodes/NodeRecipe";
import { TypeNode as TypeNodeOpen } from "./components/flow/nodes/NodeOpen";
import { TypeNode as TypeNodeIf } from "./components/flow/nodes/NodeIf";

export const NODE_TYPE = {
  START: "start",
  RECIPE: "recipe",
  OPEN: "open",
  IF: "if",
} as const;

export type ShoukaiNodeType = (typeof NODE_TYPE)[keyof typeof NODE_TYPE];

export const PALETTE_NODES_TYPES: ShoukaiNodeType[] = Object.values(NODE_TYPE);

export type NodeSharedData = { label: string; description: string };

export type ShoukaiNode =
  | TypeNodeStart
  | TypeNodeRecipe
  | TypeNodeOpen
  | TypeNodeIf;
