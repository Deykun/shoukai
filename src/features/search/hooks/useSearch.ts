import { useCallback, useEffect } from "react";

import { SearchResult } from '@/types'
import { recipes } from '@/constants';
import { openInNewTab } from '@/utils/url'
import { getSearchKey } from '@/features/search/api/search';
import useSearchStore, { setResults } from '@/features/search/stores/searchStore';

declare global {
  interface Window {
    shoukaiGetResultsByKey?: () => {
      [key: string]: {
        date: string,
        results: SearchResult[],
      }
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
  
  const lowerCasedSearchPhrase = searchPhrase.toLowerCase();

  const resultsByKey = window.shoukaiGetResultsByKey ? window.shoukaiGetResultsByKey() : {};
  const searchKey = getSearchKey(lowerCasedSearchPhrase, recipes[0].options[0].domain);

  if (resultsByKey[searchKey]?.results) {
    const results = resultsByKey[searchKey].results as SearchResult[];

    setResults(results);

    return;
  }

  const domainWithSearch = recipes[0].options[0].getSearchUrl(lowerCasedSearchPhrase, searchKey);

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
