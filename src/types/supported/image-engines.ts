import z from "zod";

export const shoukaiSearchEngineImageSchema = z.enum([
  "defaultSearch",
  "google",
]);

export type ShoukaiSearchEngineImage = z.infer<
  typeof shoukaiSearchEngineImageSchema
>;

export type SupportedSearchEngineImage = Exclude<
  ShoukaiSearchEngineImage,
  "defaultSearch"
>;
