import { SearchRecipe, SearchResult } from '@/types';

import { openInNewTab } from '@/utils/url';

import { getSearchKey } from '@/features/search/api/search';
import { getSearchKeyAndDomainURL } from '@/features/search/utils/url';
import { setResults } from '@/features/search/stores/searchStore';

import { getResultScoreDefault } from './default';

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

    const getResultScore = recipes?.[0]?.getResultScore || recipes?.[0]?.options?.[0]?.getResultScore || getResultScoreDefault;
    
    const phrase = searchPhrase.toLowerCase();
    const wordsToIgnore = recipes[0].wordsToIgnore || [];
    const minimumScore = recipes[0].minimumScore || 0.2;

    const scoredResults = results.map((result) => {
      const title = result.title.toLowerCase().replace(/[\)|\-|\(|0-9]/g, ' ').split(' ').filter((word) => word && !wordsToIgnore.includes(word)).join(' ');

      return { ...result, score: getResultScore({ phrase, title }) }
    });

    const validResults = scoredResults.filter(({ score }) => score >= minimumScore);

    const sortedResults = validResults.sort((a, b) => b.score - a.score);

    setResults(sortedResults);
  }
};
