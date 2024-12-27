export type GetResultScoreParams = { phrase: string, title: string };

export type GetResultScore = (params: GetResultScoreParams) => number;

export type SearchShortcut = {
  domain: string,
  getSearchUrl: (searchPhrase: string, searchKey: string) => string,
  getResultScore?: GetResultScore,
};

export type SearchRecipe = {
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
  wordsToPromote?: string[],
  // For example, Amazon.com will have the word "Amazon" in its title, and it should be ignored.
  wordsToIgnore?: string[],
  getResultScore?: GetResultScore,
  minimumScore: number,
};

export type SearchResult = {
  source: string,
  url: string,
  title: string,
  description?: string,
};

export type SearchResultEvaluated = SearchResult & {
  score: number,
}
