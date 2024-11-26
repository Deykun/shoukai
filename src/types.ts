export type SearchShortcut = {
  name: string,
  domain: string,
  getSearchUrl: (searchPhrase: string, searchKey: string) => string,
};

export type SearchRecipe = {
  name: string,
  options: SearchShortcut[],
};

export type SearchResult = {
  source: string,
  url: string,
  title: string,
  description?: string,
};
