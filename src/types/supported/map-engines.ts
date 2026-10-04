import z from "zod";

export const shoukaiSearchEngineMapSchema = z.enum([
  "defaultSearch",
  "google",
  "openstreetmap",
  "apple",
]);

export type ShoukaiSearchEngineMap = z.infer<
  typeof shoukaiSearchEngineMapSchema
>;

export type SupportedShoukaiSearchEngineMap = Exclude<
  ShoukaiSearchEngineMap,
  "defaultSearch"
>;
