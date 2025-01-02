import { SearchRecipe, SearchResult, SearchResultEvaluated } from '@/types';

import { openInNewTab } from '@/utils/url';

import { getSearchKeyAndDomainURL } from '@/features/search/utils/url';
import { setResults } from '@/features/search/stores/searchStore';

import { getResultScoreDefault } from './default';

export const getRecipiesForPhrase = (searchPhrase: string, recipes: SearchRecipe[], tags: string[]) => {
  if (tags.length === 0) {
    return recipes;
  }

  return recipes.filter(
    ({ promoteForTags, skipForTags }) => {
      if (tags.some((tag) => promoteForTags.includes(tag))) {
        // Has promoted tag
        return true;
      }

      if (tags.some((tag) => skipForTags.includes(tag))) {
        // Has tag to skip
        return false;
      }

      // Let's try
      return true;
    }
  );
};

let openedTabs: {
  [url: string]: true,
} = {};

export const performSearch = (searchPhrase: string, recipes: SearchRecipe[]) => {
  if (!searchPhrase) {
    setResults([]);
  
    return;
  }

  for (const recipe of recipes) {
    const {
      searchKey,
      domainWithSearch
    } = getSearchKeyAndDomainURL(searchPhrase, recipe);
  
    const resultsByKey = window.shoukaiGetResultsByKey ? window.shoukaiGetResultsByKey() : {};
  
    const hasResults = resultsByKey[searchKey]?.results;
    const wasTabOpenAlread = openedTabs[domainWithSearch];

    const shouldSearch = !hasResults && !wasTabOpenAlread;
  
    if (shouldSearch) {
      openedTabs[domainWithSearch] = true;
  
      openInNewTab(domainWithSearch);
    }
  }
};

export const indexResults = (searchPhrase: string, recipes: SearchRecipe[]) => {
  if (!searchPhrase) {
    setResults([]);
  
    return;
  }

  let allValidResults: SearchResultEvaluated[] = [];

  for (const recipe of recipes) {
    const {
      searchKey,
    } = getSearchKeyAndDomainURL(searchPhrase, recipe);

    const resultsByKey = window.shoukaiGetResultsByKey ? window.shoukaiGetResultsByKey() : {};
    
    if (resultsByKey[searchKey]?.results) {
      const results = resultsByKey[searchKey].results as SearchResult[];

      const getResultScore = recipe?.getResultScore || recipe?.options?.[0]?.getResultScore || getResultScoreDefault;
      
      const phrase = searchPhrase.toLowerCase();
      const wordsToIgnore = recipe.wordsToIgnore || [];
      const minimumScore = recipe.minimumScore ?? 0.2;

      const scoredResults = results.map((result) => {
        const title = result.title.toLowerCase().replace(/[\)|\-|\(|0-9]/g, ' ').split(' ').filter((word) => word && !wordsToIgnore.includes(word)).join(' ');

        return { ...result, score: getResultScore({ phrase, title }), recipe: { svgIcon: recipe.svgIcon } }
      });

      const validResults = scoredResults.filter(({ score }) => score >= minimumScore);

      console.log({
        validResults,
        name: recipe.name,
      });

      allValidResults = [...allValidResults, ...validResults];
    }
  }

  const sortedResults = allValidResults.sort((a, b) => b.score - a.score);

  setResults(sortedResults);
};
