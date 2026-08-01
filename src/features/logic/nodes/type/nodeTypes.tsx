import { NodeTypes } from "@xyflow/react";
import { ZodType } from "zod";
import { NodeRecipe } from "./recipe/NodeRecipe";
import { NodeStart } from "./start/NodeStart";
import { NodeOpen } from "./open/NodeOpen";
import { NodeIf } from "./if/NodeIf";
import { ShoukaiNode, ShoukaiNodeType } from "./types";

import {
  defaultData as defaultDataNodeStart,
  nodeSchema as nodeSchemaNodeStart,
} from "./start/setup";
import {
  defaultData as defaultDataNodeRecipe,
  nodeSchema as nodeSchemaNodeRecipe,
} from "./recipe/setup";
import {
  defaultData as defaultDataNodeOpen,
  nodeSchema as nodeSchemaNodeOpen,
} from "./open/setup";
import {
  defaultData as defaultDataNodeIf,
  nodeSchema as nodeSchemaNodeIf,
} from "./if/setup";

export const nodeTypes: NodeTypes = {
  start: NodeStart,
  recipe: NodeRecipe,
  open: NodeOpen,
  if: NodeIf,
  // default: NodeStart,
};

export const defaultDataByNodeType: Record<
  ShoukaiNodeType,
  ShoukaiNode["data"]
> = {
  start: defaultDataNodeStart,
  recipe: defaultDataNodeRecipe,
  open: defaultDataNodeOpen,
  if: defaultDataNodeIf,
};

export const nodeSchemaByNodeType: Record<ShoukaiNodeType, ZodType> = {
  start: nodeSchemaNodeStart,
  recipe: nodeSchemaNodeRecipe,
  open: nodeSchemaNodeOpen,
  if: nodeSchemaNodeIf,
};
