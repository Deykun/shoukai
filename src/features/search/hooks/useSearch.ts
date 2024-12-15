import { useCallback, useEffect, useState } from "react";

import { SearchResult } from '@/types'
import { userRecipes } from '@/constants';

import { getRecipiesForPhrase, performSearch, indexResults } from '@/features/search/utils/actions';
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

export default function useSearch() {
  const searchPhrase = useSearchStore(state => state.searchPhrase);
  const [searchConfig, setSearchConfig] = useState({
    phrase: searchPhrase || '',
    recipes: getRecipiesForPhrase(searchPhrase, userRecipes),
  });


  useEffect(() => {
    setResults([]);

    if (searchPhrase !== searchConfig.phrase) {
      if (searchPhrase) {
        // TODO move to other useEffect
        // performSearch(searchPhrase);
  
        setSearchConfig({
          phrase: searchPhrase,
          recipes: getRecipiesForPhrase(searchPhrase, userRecipes),
        });
        
        console.log(JSON.stringify(searchConfig));
      } else {
        setSearchConfig({
          phrase: '',
          recipes: [],
        });
      }
    }
  }, [searchPhrase]);



  useEffect(() => {
    if (searchConfig.phrase && searchConfig.recipes.length > 0) {
      performSearch(searchPhrase, searchConfig.recipes);
    }
  }, [searchConfig]);


  const cachedIndexResults = useCallback(() => {
    if (searchConfig.phrase && searchConfig.recipes.length > 0) {
      indexResults(searchPhrase, searchConfig.recipes);
    }
  }, [searchConfig]);

  useEffect(() => {
    cachedIndexResults();
  }, [cachedIndexResults]);

  const handleStorageUpdate = useCallback((event: StorageEvent) => {
    if (event) {
      setTimeout(cachedIndexResults, 10);
    }
  }, [searchConfig]);

  useEffect(() => {
    window.addEventListener('storage', handleStorageUpdate);

    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, [handleStorageUpdate])
};
