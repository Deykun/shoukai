import { type Node } from "@xyflow/react";
import z from "zod";
import { nodeSharedDataSchema, shortcutSchema } from "../schema";

export const nodeSchema = nodeSharedDataSchema.extend({
  shortcuts: z.array(shortcutSchema),
});

export type TypeNodeData = z.infer<typeof nodeSchema>;

export type TypeNode = Node<TypeNodeData, "start">;

export const defaultData: TypeNode["data"] = {
  label: "Start",
  shortcuts: [
    {
      id: "d",
      name: "DuckDuckGo",
      triggers: ["d"],
      phrase: "{{phrase}}",
      type: "search-text",
      searchEngine: "duckduckgo",
    },
    {
      id: "g",
      name: "Google",
      triggers: ["g", "google"],
      phrase: "{{phrase}}",
      type: "search-text",
      searchEngine: "google",
    },
    {
      id: "img",
      name: "Images",
      triggers: ["img"],
      phrase: "{{phrase}}",
      type: "search-image",
      searchEngine: "google",
    },
    {
      id: "meme",
      name: "Memes",
      triggers: ["meme"],
      phrase: "{{phrase}} meme",
      type: "search-image",
      searchEngine: "google",
    },
    {
      id: "?",
      name: "ChatGPT",
      triggers: ["?"],
      phrase: "{{phrase}}",
      type: "ask-chatbot",
      searchEngine: "chatgpt",
    },
    {
      id: "pl",
      name: "Tłumacz",
      triggers: ["pl"],
      phrase: "Przetłumacz na polski: {{phrase}}",
      type: "ask-chatbot",
      searchEngine: "chatgpt",
    },
    {
      id: "en",
      name: "Translate",
      triggers: ["en"],
      phrase: "Przetłumacz na angielski: {{phrase}}",
      type: "ask-chatbot",
      searchEngine: "chatgpt",
    },
    {
      id: "fix",
      name: "Fix grammar",
      triggers: ["fix"],
      phrase: "Fix grammar: {{phrase}}",
      type: "ask-chatbot",
      searchEngine: "chatgpt",
    },
    {
      id: "gm",
      name: "Map",
      triggers: ["gm", "map"],
      phrase: "{{phrase}}",
      type: "search-location",
      searchEngine: "google",
    },
  ],
  targetHandles: [],
  sourceHandles: [{ id: "success" }],
};
