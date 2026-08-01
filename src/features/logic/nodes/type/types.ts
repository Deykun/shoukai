import { TypeNode as TypeNodeStart } from "./start/setup";
import { TypeNode as TypeNodeRecipe } from "./recipe/setup";
import { TypeNode as TypeNodeOpen } from "./open/setup";
import { TypeNode as TypeNodeIf } from "./if/setup";

export const NODE_TYPE = {
  START: "start",
  RECIPE: "recipe",
  OPEN: "open",
  IF: "if",
} as const;

export type ShoukaiNodeType = (typeof NODE_TYPE)[keyof typeof NODE_TYPE];

export const PALETTE_NODES_TYPES: ShoukaiNodeType[] = Object.values(NODE_TYPE);

export type { NodeSharedData } from "./schema";

export type ShoukaiNode =
  | TypeNodeStart
  | TypeNodeRecipe
  | TypeNodeOpen
  | TypeNodeIf;
