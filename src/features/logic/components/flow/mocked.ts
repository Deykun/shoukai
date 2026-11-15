import { ShoukaiNode } from "./nodes/type/types";

export const initialNodes: ShoukaiNode[] = [
  {
    id: "n1",
    type: "start",
    position: { x: 0, y: 0 },
    data: { label: "Search", description: "Search start." },
  },
  {
    id: "n2",
    type: "shortcut",
    position: { x: 300, y: 100 },
    data: {
      label: "Shortcut",
      description:
        "It executes the shortcut if the phrase is added to the beginning or the end of the search query.",
      phrase: "img",
    },
  },
  {
    id: "n3",
    type: "recipe",
    position: { x: 500, y: 300 },
    data: {
      label: "Movies and TV shows",
      description: "Movie search engine.",
      search: {
        phrase: "phrase",
        domain: "filmweb.pl",
        engine: "defaultSearch",
      },
    },
  },
];
export const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];
