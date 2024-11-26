import { useCallback, useEffect } from "react";

import { SearchRecipe, SearchResult } from '@/types'
import { openInNewTab } from '@/utils/url'
import { getSearchKey } from '@/features/search/api/search';
import useSearchStore, { setResults } from '@/features/search/stores/searchStore';

const recipes: SearchRecipe[] = [{
  name: 'Filmweb',
  options: [{
    name: 'filmweb.pl',
    domain: 'https://www.google.com/',
    getSearchUrl: (phrase, key) => `https://www.google.com/search?q=${encodeURI(`${phrase} site:filmweb.pl`)}&shoukaiKey=${key}`,
  }],
}];

declare global {
  interface Window {
    shoukaiGetResultsByKey?: () => {
      [key: string]: SearchResult[],
    },
  }
}

let openedTabs: {
  [url: string]: true,
} = {};

const performSearch = (searchPhrase: string) => {
  if (!searchPhrase) {
    setResults([]);
  
    return;
  }

  const resultsByKey = window.shoukaiGetResultsByKey ? window.shoukaiGetResultsByKey() : {};
  const searchKey = getSearchKey(searchPhrase);

  if (resultsByKey[searchKey]) {
    const results = resultsByKey[searchKey] as SearchResult[];

    setResults(results);

    return;
  }

  const domainWithSearch = recipes[0].options[0].getSearchUrl(searchPhrase, searchKey);

  if (openedTabs[domainWithSearch]) {
    return;
  }

  openedTabs[domainWithSearch] = true;

  openInNewTab(domainWithSearch);
};

export default function useSearch() {
  const searchPhrase = useSearchStore(state => state.searchPhrase);

  useEffect(() => {
    setResults([]);

    if (searchPhrase) {
      performSearch(searchPhrase);
    }
  }, [searchPhrase]);

  const handleStorageUpdate = useCallback((event: StorageEvent) => {
    if (event) {
      setTimeout(() => performSearch(searchPhrase), 10);
    }
  }, [searchPhrase]);

  useEffect(() => {
    window.addEventListener('storage', handleStorageUpdate);

    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, [handleStorageUpdate])
};
