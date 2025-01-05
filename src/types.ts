export type GetResultScoreParams = { phrase: string, title: string };

export type GetResultScore = (params: GetResultScoreParams) => number;

export type SearchShortcut = {
  domain: string,
  getSearchUrl: (searchPhrase: string, searchKey: string) => string,
  getResultScore?: GetResultScore,
};

export type SearchRecipe = {
  id: string,
  name: string,
  description?: string,
  svgIcon?: string,
  byLang?: {
    [lang: string]: {
      name: string,
      description: string,
    }
  },
  options: SearchShortcut[],
  promoteForTags: string[],
  skipForTags: string[],
  wordsToPromote?: string[],
  // For example, Amazon.com will have the word "Amazon" in its title, and it should be ignored.
  wordsToIgnore?: string[],
  getResultScore?: GetResultScore,
  minimumScore: number,
  // Used at the beginning or end of a query, it will simply jump there
  shortcut?: string,
};

export type SearchResult = {
  source: string,
  url: string,
  title: string,
  description?: string,
};

export type SearchResultEvaluated = SearchResult & {
  score: number,
  recipeId: string,
}
