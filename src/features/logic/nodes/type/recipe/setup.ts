import { type Node } from "@xyflow/react";
import z from "zod";
import { nodeSharedDataSchema } from "../schema";
import { shoukaiSearchEngineTextSchema } from "@/types/supported/text-engines";

export const nodeSchema = nodeSharedDataSchema.extend({
  search: z.object({
    phrase: z.string(),
    domain: z.string(),
    engine: shoukaiSearchEngineTextSchema,
  }),
});

export type TypeNodeData = z.infer<typeof nodeSchema>;

export type TypeNode = Node<TypeNodeData, "recipe">;

export const defaultData: TypeNode["data"] = {
  label: "Recipe",
  search: {
    phrase: "{{phrase}}",
    domain: "pogoda.pl",
    engine: "defaultSearch",
  },
  targetHandles: [{ id: "target" }],
  sourceHandles: [{ id: "success" }, { id: "error" }],
};
