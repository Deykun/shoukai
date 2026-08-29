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
  description: "Open a search engine or map",
  type: "search",
  engine: "defaultSearch",
  phrase: "{{phrase}}",
};
