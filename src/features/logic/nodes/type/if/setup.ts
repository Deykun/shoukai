import { type Node } from "@xyflow/react";
import z from "zod";
import { nodeSharedDataSchema } from "../schema";

export const COMPARE_OPERATOR = {
  CONTAINS: "contains",
  EQUALS: "equals",
  STARTS_WITH: "startsWith",
  ENDS_WITH: "endsWith",
} as const;

export type CompareOperator =
  (typeof COMPARE_OPERATOR)[keyof typeof COMPARE_OPERATOR];

export const COMPARE_OPERATORS = Object.values(COMPARE_OPERATOR);

export const nodeSchema = nodeSharedDataSchema.extend({
  x: z.array(z.string()),
  compare: z.enum(COMPARE_OPERATOR),
  y: z.array(z.string()),
});

export type TypeNodeData = z.infer<typeof nodeSchema>;

export type TypeNode = Node<TypeNodeData, "if">;

export const defaultData: TypeNode["data"] = {
  label: "If",
  x: ["{{phrase}}"],
  compare: "contains",
  y: ["something"],
  targetHandles: [{ id: "target" }],
  sourceHandles: [{ id: "success" }, { id: "error" }],
};
