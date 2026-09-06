import z from "zod";
import { ShoukaiSearchEngine } from "@/constants";

const handleSchema = z.object({
  id: z.string(),
});

export const nodeSharedDataSchema = z.object({
  label: z.string(),
  sourceHandles: z.array(handleSchema),
  targetHandles: z.array(handleSchema),
});

export type NodeSharedData = z.infer<typeof nodeSharedDataSchema>;

export const shoukaiSearchEngineSchema = z.enum([
  "defaultSearch",
  "bing",
  "duckduckgo",
  "google",
  "yandex",
] satisfies ShoukaiSearchEngine[]);
