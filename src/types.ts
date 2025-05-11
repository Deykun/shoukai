import { SupportedSearchEngine } from "./constants";

export type GetResultScoreParams = { phrase: string; title: string };

export type GetResultScore = (params: GetResultScoreParams) => number;

export type SearchRecipe = {
  id: string;
  name: string;
  description?: string;
  svgIcon?: string;
  byLang?: {
    [lang: string]: {
      name: string;
      description: string;
    };
  };
  searchOptions: {
    default: string;
    bing?: string;
    duckduckgo?: string;
    google?: string;
    yandex?: string;
  };
  promoteForTags: string[];
  skipForTags: string[];
  wordsToPromote?: string[];
  // For example, Amazon.com will have the word "Amazon" in its title, and it should be ignored.
  wordsToIgnore?: string[];
  getResultScore?: GetResultScore;
  minimumScore: number;
  // Used at the beginning or end of a query, it will simply jump there
  shortcut?: string;
};

export type UserSearchRecipe = {
  id: string;
  isActive: boolean;
  searchEngine?: SupportedSearchEngine;
};

export type ShoukaiSearchRecipe = SearchRecipe & UserSearchRecipe;

export type SearchResult = {
  source: string;
  url: string;
  title: string;
  description?: string;
};

export type SearchResultEvaluated = SearchResult & {
  score: number;
  recipeId: string;
};

export type SearchDirectShortcut = {
  magicWord: string;
  getSearchUrl: (phrase: string) => string;
};

export type ShoukaiQuery = {
  phrase: string;
  date: Date;
  openedTabs: string[];
  searchKeys: string[];
};
