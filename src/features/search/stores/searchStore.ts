import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

import { SearchResult } from '@/types';


type SearchStoreState = {
  searchPhrase: string,
  results: SearchResult[],
}

export const useSearchStore = create<SearchStoreState>()(
  devtools(
    () => ({
      searchPhrase: '',
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

export default useSearchStore;