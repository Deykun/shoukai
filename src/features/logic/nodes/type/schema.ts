import z from "zod";
import {
  SearchEngineToOpen,
  searchEngineToOpenOptions,
  searchEngineToOpenSchema,
  SearchEngineToOpenType,
} from "@/features/logic-runner/parsers/openers/types";

const handleSchema = z.object({
  id: z.string(),
});

export const nodeSharedDataSchema = z.object({
  label: z.string(),
  sourceHandles: z.array(handleSchema),
  targetHandles: z.array(handleSchema),
});

export type NodeSharedData = z.infer<typeof nodeSharedDataSchema>;

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
