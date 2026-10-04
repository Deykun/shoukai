import { type Node } from "@xyflow/react";
import z from "zod";
import { nodeSharedDataSchema, shortcutSchema } from "../schema";

export const nodeSchema = nodeSharedDataSchema.extend({
  shortcuts: z.record(z.string(), shortcutSchema),
});

export type TypeNodeData = z.infer<typeof nodeSchema>;

export type TypeNode = Node<TypeNodeData, "start">;

export const defaultData: TypeNode["data"] = {
  label: "Start",
  shortcuts: {
    d: {
      id: "d",
      name: "DuckDuckGo",
      triggers: ["d"],
      phrase: "{{phrase}}",
      type: "search-text",
      searchEngine: "duckduckgo",
    },
    g: {
      id: "g",
      name: "Google",
      triggers: ["g", "google"],
      phrase: "{{phrase}}",
      type: "search-text",
      searchEngine: "google",
    },
    img: {
      id: "img",
      name: "Images",
      triggers: ["img", "meme"],
      phrase: "{{phrase}}",
      type: "search-image",
      searchEngine: "google",
    },
    "?": {
      id: "?",
      name: "ChatGPT",
      triggers: ["?"],
      phrase: "{{phrase}}",
      type: "ask-chatbot",
      searchEngine: "chatgpt",
    },
    pl: {
      id: "pl",
      name: "Tłumacz",
      triggers: ["pl"],
      phrase: "Przetłumacz na polski: {{phrase}}",
      type: "ask-chatbot",
      searchEngine: "chatgpt",
    },
    en: {
      id: "en",
      name: "Translate",
      triggers: ["en"],
      phrase: "Przetłumacz na angielski {{phrase}}",
      type: "ask-chatbot",
      searchEngine: "chatgpt",
    },
    fix: {
      id: "fix",
      name: "Fix grammar",
      triggers: ["fix"],
      phrase: "Fix grammar {{phrase}}",
      type: "ask-chatbot",
      searchEngine: "chatgpt",
    },
    gm: {
      id: "gm",
      name: "Mapa",
      triggers: ["gm", "map"],
      phrase: "{{phrase}}",
      type: "search-location",
      searchEngine: "google",
    },
  },
  targetHandles: [],
  sourceHandles: [{ id: "success" }],
};
