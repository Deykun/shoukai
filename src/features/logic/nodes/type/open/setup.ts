import { type Node } from "@xyflow/react";
import z from "zod";
import { nodeSharedDataSchema } from "../schema";
import { shoukaiSearchEngineTextSchema } from "@/types/supported/text-engines";

export const nodeSchema = nodeSharedDataSchema.extend({
  type: z.enum(["search", "img", "map"]),
  engine: shoukaiSearchEngineTextSchema,
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
