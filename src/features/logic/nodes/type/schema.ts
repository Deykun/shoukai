import z from "zod";
import { ShoukaiSearchEngine } from "@/constants";

export const nodeSharedDataSchema = z.object({
  label: z.string(),
});

export type NodeSharedData = z.infer<typeof nodeSharedDataSchema>;

export const shoukaiSearchEngineSchema = z.enum([
  "defaultSearch",
  "bing",
  "duckduckgo",
  "google",
  "yandex",
] satisfies ShoukaiSearchEngine[]);
