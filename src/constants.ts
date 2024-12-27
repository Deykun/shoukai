import { SearchRecipe } from "@/types";

import { recipe as moviesProgramming } from '@/recipies/movies';
import { recipe as programmingRecipe } from '@/recipies/programming';

// TODO: replace with cached state
export const userRecipes: SearchRecipe[] = [
  moviesProgramming,
  programmingRecipe,
];

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
