import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

import { SearchResult } from '@/types';

import { getInitDataFromSearchParams } from '@/features/search/utils/url';


type SearchStoreState = {
  searchPhrase: string,
  results: SearchResult[],
}

export const useSearchStore = create<SearchStoreState>()(
  devtools(
    () => ({
      searchPhrase: getInitDataFromSearchParams().searchPhrase,
      results: [],
    } as SearchStoreState),
    { name: 'searchStore' },
  )
);

export const setSearchPhrase = (value: string) => {
  useSearchStore.setState((state) => ({
    ...state,
    searchPhrase: value,
  }));
};

export const setResults = (results: SearchResult[]) => {
  useSearchStore.setState((state) => ({
      ...state,
      results,
  }));
}

declare global {
  interface Window {
    setResults: (results: SearchResult[]) => void,
  }
}

// TODO: Remove
window.setResults = setResults;

export default useSearchStore;