import z from "zod";
import { ShoukaiSearchEngineText } from "@/constants";
import { shoukaiSearchEngineTextSchema } from "@/types/supported/text-engines";
import { shoukaiSearchEngineImageSchema } from "@/types/supported/image-engines";
import { shoukaiSearchEngineMapSchema } from "@/types/supported/map-engines";
import { shoukaiChatbotSchema } from "@/types/supported/chatbots";

const handleSchema = z.object({
  id: z.string(),
});

export const nodeSharedDataSchema = z.object({
  label: z.string(),
  sourceHandles: z.array(handleSchema),
  targetHandles: z.array(handleSchema),
});

export type NodeSharedData = z.infer<typeof nodeSharedDataSchema>;

const shortcutBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  triggers: z.array(z.string()),
  phrase: z.string(),
});

export const shortcutSchema = z.discriminatedUnion("type", [
  shortcutBaseSchema.extend({
    type: z.literal("search-text"),
    searchEngine: shoukaiSearchEngineTextSchema,
  }),
  shortcutBaseSchema.extend({
    type: z.literal("search-image"),
    searchEngine: shoukaiSearchEngineImageSchema,
  }),
  shortcutBaseSchema.extend({
    type: z.literal("search-location"),
    searchEngine: shoukaiSearchEngineMapSchema,
  }),
  shortcutBaseSchema.extend({
    type: z.literal("ask-chatbot"),
    searchEngine: shoukaiChatbotSchema,
  }),
]);

export type ShoukaiShortcut = z.infer<typeof shortcutSchema>;
