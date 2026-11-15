import z from "zod";
import { shoukaiSearchEngineTextSchema } from "@/types/supported/text-engines";
import { shoukaiSearchEngineImageSchema } from "@/types/supported/image-engines";
import { shoukaiSearchEngineMapSchema } from "@/types/supported/map-engines";
import { shoukaiChatbotSchema } from "@/types/supported/chatbots";

// Discriminated union has no .extend(), so variants are built via a factory
// that takes extra shape - lets both unions below share one definition.
export const searchEngineToOpenOptions = <B extends z.core.$ZodLooseShape>(
  base: B,
) =>
  [
    z.object({
      ...base,
      type: z.literal("search-text"),
      searchEngine: shoukaiSearchEngineTextSchema,
    }),
    z.object({
      ...base,
      type: z.literal("search-image"),
      searchEngine: shoukaiSearchEngineImageSchema,
    }),
    z.object({
      ...base,
      type: z.literal("search-location"),
      searchEngine: shoukaiSearchEngineMapSchema,
    }),
    z.object({
      ...base,
      type: z.literal("ask-chatbot"),
      searchEngine: shoukaiChatbotSchema,
    }),
  ] as const;

export const searchEngineToOpenSchema = z.discriminatedUnion(
  "type",
  searchEngineToOpenOptions({}),
);

export type SearchEngineToOpen = z.infer<typeof searchEngineToOpenSchema>;
export type SearchEngineToOpenType = SearchEngineToOpen["type"];
