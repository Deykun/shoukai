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

export const shoukaiSearchEngineImageSchema = z.enum(["google"]);

export type ShoukaiSearchEngineImage = z.infer<
  typeof shoukaiSearchEngineImageSchema
>;

export const shoukaiSearchEngineLocationSchema = z.enum([
  "google",
  "openstreetmap",
  "apple",
]);

export type ShoukaiSearchEngineLocation = z.infer<
  typeof shoukaiSearchEngineLocationSchema
>;

export const shoukaiChatbotSchema = z.enum(["chatgpt", "claude"]);

export type ShoukaiChatbot = z.infer<typeof shoukaiChatbotSchema>;

const shortcutBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  triggers: z.array(z.string()),
  phrase: z.string(),
});

export const shortcutSchema = z.discriminatedUnion("type", [
  shortcutBaseSchema.extend({
    type: z.literal("search-text"),
    searchEngine: shoukaiSearchEngineSchema,
  }),
  shortcutBaseSchema.extend({
    type: z.literal("search-image"),
    searchEngine: shoukaiSearchEngineImageSchema,
  }),
  shortcutBaseSchema.extend({
    type: z.literal("search-location"),
    searchEngine: shoukaiSearchEngineLocationSchema,
  }),
  shortcutBaseSchema.extend({
    type: z.literal("ask-chatbot"),
    searchEngine: shoukaiChatbotSchema,
  }),
]);

export type ShoukaiShortcut = z.infer<typeof shortcutSchema>;
