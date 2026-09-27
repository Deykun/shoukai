import z from "zod";
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

// Discriminated union has no .extend(), so variants are built via a factory
// that takes extra shape - lets both unions below share one definition.
const searchEngineToOpenOptions = <B extends z.core.$ZodLooseShape>(base: B) =>
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

// Derived from the union so UI option lists can't drift from what parses
export const SEARCH_ENGINES_BY_TYPE = searchEngineToOpenSchema.options.reduce(
  (byType, option) => ({
    ...byType,
    [option.shape.type.value]: option.shape.searchEngine.options,
  }),
  {} as Record<SearchEngineToOpenType, readonly string[]>,
);

export const SEARCH_ENGINE_TO_OPEN_TYPES = Object.keys(
  SEARCH_ENGINES_BY_TYPE,
) as SearchEngineToOpenType[];

// First engine of a type is its default
export const getDefaultSearchEngineToOpen = (
  type: SearchEngineToOpenType,
): SearchEngineToOpen =>
  searchEngineToOpenSchema.parse({
    type,
    searchEngine: SEARCH_ENGINES_BY_TYPE[type][0],
  });

const shortcutBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  triggers: z.array(z.string()),
  phrase: z.string(),
});

export const shortcutSchema = z.discriminatedUnion(
  "type",
  searchEngineToOpenOptions(shortcutBaseSchema.shape),
);

export type ShoukaiShortcut = z.infer<typeof shortcutSchema>;
