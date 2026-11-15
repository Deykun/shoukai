import z from "zod";

export const shoukaiChatbotSchema = z.enum([
  "defaultSearch",
  "chatgpt",
  "claude",
]);

export type ShoukaiChatbot = z.infer<typeof shoukaiChatbotSchema>;

export type SupportedShoukaiChatbot = Exclude<ShoukaiChatbot, "defaultSearch">;
