import { SearchRecipe, SearchResult } from '@/types';

import { openInNewTab } from '@/utils/url';

import { getSearchKey } from '@/features/search/api/search';
import { getSearchKeyAndDomainURL } from '@/features/search/utils/url';
import { setResults } from '@/features/search/stores/searchStore';

export const getRecipiesForPhrase = (searchPhrase: string, recipes: SearchRecipe[]) => {
  return recipes;
};

let openedTabs: {
  [url: string]: true,
} = {};

export const performSearch = (searchPhrase: string, recipes: SearchRecipe[]) => {
  if (!searchPhrase) {
    setResults([]);
  
    return;
  }

  const {
    searchKey,
    domainWithSearch
  } = getSearchKeyAndDomainURL(searchPhrase, recipes[0]);

  const resultsByKey = window.shoukaiGetResultsByKey ? window.shoukaiGetResultsByKey() : {};

  const hasResults = resultsByKey[searchKey]?.results;
  const wasTabOpenAlread = openedTabs[domainWithSearch];

  if (hasResults || wasTabOpenAlread) {
    return;
  }

  openedTabs[domainWithSearch] = true;

  openInNewTab(domainWithSearch);
};

export const indexResults = (searchPhrase: string, recipes: SearchRecipe[]) => {
  if (!searchPhrase) {
    setResults([]);
  
    return;
  }

  const {
    searchKey,
    domainWithSearch,
  } = getSearchKeyAndDomainURL(searchPhrase, recipes[0]);

  const resultsByKey = window.shoukaiGetResultsByKey ? window.shoukaiGetResultsByKey() : {};

  console.log({
    searchKey,
    domainWithSearch,
  })
  
  if (resultsByKey[searchKey]?.results) {
    const results = resultsByKey[searchKey].results as SearchResult[];

    setResults(results);
  }
};
