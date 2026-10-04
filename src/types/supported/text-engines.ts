import z from "zod";

// We can open those pages
export const shoukaiSearchEngineTextSchema = z.enum([
  "defaultSearch",
  "bing",
  "duckduckgo",
  "google",
  "yandex",
]);

export type ShoukaiSearchEngineText = z.infer<
  typeof shoukaiSearchEngineTextSchema
>;

export type SupportedShoukaiSearchEngineText = Exclude<
  ShoukaiSearchEngineText,
  "defaultSearch"
>;

// We can parse results from this pages
export const shoukaiSearchEngineTextParsersSchema = z.enum([
  "defaultSearch",
  "duckduckgo",
  "google",
  "yandex",
]);

export type ShoukaiSearchEngineTextParsers = z.infer<
  typeof shoukaiSearchEngineTextParsersSchema
>;

export type SupportedShoukaiSearchEngineTextParsers = Exclude<
  ShoukaiSearchEngineTextParsers,
  "defaultSearch"
>;
