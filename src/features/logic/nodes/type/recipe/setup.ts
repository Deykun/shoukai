import { type Node } from "@xyflow/react";
import z from "zod";
import { nodeSharedDataSchema, shoukaiSearchEngineSchema } from "../schema";

export const nodeSchema = nodeSharedDataSchema.extend({
  search: z.object({
    phrase: z.string(),
    domain: z.string(),
    engine: shoukaiSearchEngineSchema,
  }),
});

export type TypeNodeData = z.infer<typeof nodeSchema>;

export type TypeNode = Node<TypeNodeData, "recipe">;

export const defaultData: TypeNode["data"] = {
  label: "Recipe",
  description: "Recipe",
  search: {
    phrase: "{{phrase}}",
    domain: "pogoda.pl",
    engine: "defaultSearch",
  },
};

