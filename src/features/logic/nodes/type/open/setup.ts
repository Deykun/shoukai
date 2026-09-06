import { type Node } from "@xyflow/react";
import z from "zod";
import { nodeSharedDataSchema, shoukaiSearchEngineSchema } from "../schema";

export const nodeSchema = nodeSharedDataSchema.extend({
  type: z.enum(["search", "img", "map"]),
  engine: shoukaiSearchEngineSchema,
  phrase: z.string(),
});

export type TypeNodeData = z.infer<typeof nodeSchema>;

export type TypeNode = Node<TypeNodeData, "open">;

export const defaultData: TypeNode["data"] = {
  label: "Open",
  type: "search",
  engine: "defaultSearch",
  phrase: "{{phrase}}",
  targetHandles: [{ id: "target" }],
  sourceHandles: [],
};
