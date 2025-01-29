import { SearchRecipe, SearchDirectShortcut } from "@/types";

import {
  getDuckDuckGoSearchUrl,
  getGoogleSearchUrl,
  getGoogleImagesSearchUrl,
  getGoogleMapsSearchUrl,
} from '@/features/search/utils/search';

import { recipe as moviesProgramming } from "@/recipies/movies";
import { recipe as programmingRecipe } from "@/recipies/programming";

export const directShortcutByKey: {
  [id: string]: SearchDirectShortcut;
} = {
  d: {
    magicWord: 'd',
    getSearchUrl: (phrase: string) => getDuckDuckGoSearchUrl(phrase),
  },
  g: {
    magicWord: 'g',
    getSearchUrl: (phrase: string) => getGoogleSearchUrl(phrase),
  },
  img: {
    magicWord: 'img',
    getSearchUrl: (phrase: string) => getGoogleImagesSearchUrl(phrase),
  },
  gm: {
    magicWord: 'gm',
    getSearchUrl: (phrase: string) => getGoogleMapsSearchUrl(phrase),
  },
};

export const directShortcuts = Object.values(directShortcutByKey);

// TODO: replace with cached state
export const userRecipeByKey: {
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

export const userRecipes = Object.values(userRecipeByKey);

export const PATHS_DATA: {
  type?: string;
  pathNameLink: string;
  path: string;
  title: string;
  social: string;
  lang: string;
}[] = [] as const;

export const LOCAL_STORAGE = {
  SHOUKAI_UPDATE: "SHOUKAI_UPDATE",
  SHOUKAI_USER_LANG: "SHOUKAI_USER_LANG",
} as const;
