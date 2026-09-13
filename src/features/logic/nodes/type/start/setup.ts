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
      phrase: "<reference>{{phrase}}</reference>",
      type: "search-text",
      searchEngine: "duckduckgo",
    },
    g: {
      id: "g",
      name: "Google",
      triggers: ["g", "google"],
      phrase: "<reference>{{phrase}}</reference>",
      type: "search-text",
      searchEngine: "google",
    },
    img: {
      id: "img",
      name: "Images",
      triggers: ["img", "meme"],
      phrase: "<reference>{{phrase}}</reference>",
      type: "search-image",
      searchEngine: "google",
    },
    "?": {
      id: "?",
      name: "ChatGPT",
      triggers: ["?"],
      phrase: "<reference>{{phrase}}</reference>",
      type: "ask-chatbot",
      searchEngine: "chatgpt",
    },
    pl: {
      id: "pl",
      name: "Translate",
      triggers: ["pl"],
      phrase: "Przetłumacz na polski: <reference>{{phrase}}</reference>",
      type: "ask-chatbot",
      searchEngine: "chatgpt",
    },
    en: {
      id: "en",
      name: "Translate",
      triggers: ["en"],
      phrase: "Przetłumacz na angielski <reference>{{phrase}}</reference>",
      type: "ask-chatbot",
      searchEngine: "chatgpt",
    },
    fix: {
      id: "fix",
      name: "Fix grammar",
      triggers: ["fix"],
      phrase: "Fix grammar <reference>{{phrase}}</reference>",
      type: "ask-chatbot",
      searchEngine: "chatgpt",
    },
    gm: {
      id: "gm",
      name: "Mapa",
      triggers: ["gm", "map"],
      phrase: "<reference>{{phrase}}</reference>",
      type: "search-location",
      searchEngine: "google",
    },
  },
  targetHandles: [],
  sourceHandles: [{ id: "success" }],
};
