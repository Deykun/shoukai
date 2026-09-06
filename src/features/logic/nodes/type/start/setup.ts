import { type Node } from "@xyflow/react";
import z from "zod";
import { nodeSharedDataSchema } from "../schema";

export const nodeSchema = nodeSharedDataSchema.extend({
  shortcuts: z.array(z.string()),
});

export type TypeNodeData = z.infer<typeof nodeSchema>;

export type TypeNode = Node<TypeNodeData, "start">;

export const defaultData: TypeNode["data"] = {
  label: "Start",
  shortcuts: ["d", "g", "img", "gm"],
  targetHandles: [],
  sourceHandles: [{ id: "success" }],
};
