import { SearchRecipe, SearchDirectShortcut, UserSearchRecipe } from "@/types";

import {
  getDuckDuckGoSearchUrl,
  getGoogleSearchUrl,
  getGoogleImagesSearchUrl,
  getGoogleMapsSearchUrl,
} from "@/features/search/utils/search";

import { recipe as moviesProgramming } from "@/recipes/movies";
import { recipe as programmingRecipe } from "@/recipes/programming";

export type SupportedSearchEngine = "bing" | "duckduckgo" | "google" | "yandex";

export const supportedSearchEngines: SupportedSearchEngine[] = [
  "bing",
  "duckduckgo",
  "google",
  "yandex",
];

export const supportedSearchEnginesParsers: SupportedSearchEngine[] = [
  "duckduckgo",
  "google",
  "yandex",
];

const getDirectShortcutsForMagicWords = (
  magicWords: string[],
  getter: (phrase: string) => string
) => {
  return magicWords.reduce(
    (
      stack: {
        [id: string]: SearchDirectShortcut;
      },
      word
    ) => {
      stack[word] = {
        magicWord: word,
        getSearchUrl: getter,
      };

      return stack;
    },
    {}
  );
};

// TODO: move to editable setting
export const directShortcutByKey: {
  [id: string]: SearchDirectShortcut;
} = {
  ...getDirectShortcutsForMagicWords(['d'], (phrase: string) => getDuckDuckGoSearchUrl(phrase)),
  ...getDirectShortcutsForMagicWords(['g', 'google'], (phrase: string) => getGoogleSearchUrl(phrase)),
  ...getDirectShortcutsForMagicWords(['img'], (phrase: string) => getGoogleImagesSearchUrl(phrase)),
  ...getDirectShortcutsForMagicWords(['gm'], (phrase: string) => getGoogleMapsSearchUrl(phrase)),
};

export const directShortcuts = Object.values(directShortcutByKey);

export const recipeById: {
  [id: string]: SearchRecipe;
} = {
  movies: {
    ...moviesProgramming,
    id: "movies",
  },
  programming: {
    ...programmingRecipe,
    id: "programming",
  },
};

export const initRecipes = Object.values(recipeById).reduce(
  (
    stack: {
      [id: string]: UserSearchRecipe;
    },
    { id }
  ) => {
    stack[id] = { id, isActive: true };

    return stack;
  },
  {}
);

export const PATHS_DATA: {
  path: string;
  title: string;
  social: string;
  lang: string;
}[] = [
  {
    path: "404",
    title: "404 - shoukai - personalized search",
    social: "",
    lang: "en",
  },
  {
    path: "reindex",
    title: "indexing... - shoukai - personalized search",
    social: "",
    lang: "en",
  },
] as const;

export const LOCAL_STORAGE = {
  SHOUKAI_UPDATE: "SHOUKAI_UPDATE",
  SHOUKAI_USER_LANG: "SHOUKAI_USER_LANG",
} as const;
