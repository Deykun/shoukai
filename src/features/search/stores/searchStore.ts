import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

import { SearchResultEvaluated } from '@/types';

import { getInitDataFromSearchParams } from '@/features/search/utils/url';


type SearchStoreState = {
  searchPhrase: string,
  results: SearchResultEvaluated[],
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

export const setResults = (results: SearchResultEvaluated[]) => {
  useSearchStore.setState((state) => ({
      ...state,
      results,
  }));
}

export default useSearchStore;