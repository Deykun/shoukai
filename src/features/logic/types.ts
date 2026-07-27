import { ShoukaiSearchEngine } from "@/constants";
import { type Node } from "@xyflow/react";

export const NODE_TYPE = {
  START: "start",
  SHORTCUT: "shortcut",
  RECIPE: "recipe",
} as const;

export type ShoukaiNodeType = (typeof NODE_TYPE)[keyof typeof NODE_TYPE];

type SharedData = { label: string, description: string; };

export type TypeNodeStart = Node<SharedData, "start">;
export type TypeNodeShortcut = Node<
  {
    phrase: string;
  } & SharedData,
  "shortcut"
>;
export type TypeNodeRecipe = Node<
  {
    search: {
      phrase: string;
      domain: string;
      engine: ShoukaiSearchEngine;
    };
  } & SharedData,
  "recipe"
>;

export type ShoukaiNode = TypeNodeStart | TypeNodeShortcut | TypeNodeRecipe;
