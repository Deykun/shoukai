import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { SearchResultEvaluated } from "@/types";

import { getMetaFromSearchPhrase } from "@/features/search/utils/meta";
import { getInitDataFromSearchParams } from "@/features/search/utils/url";

type SearchStoreState = {
  searchPhrase: string;
  meta: {
    input: string[];
    results: string[];
  };
  results: SearchResultEvaluated[];
};

export const useSearchStore = create<SearchStoreState>()(
  devtools(
    () =>
      ({
        searchPhrase: getInitDataFromSearchParams().searchPhrase,
        meta: {
          input: getMetaFromSearchPhrase(
            getInitDataFromSearchParams().searchPhrase
          ),
          results: [],
        },
        results: [],
      } as SearchStoreState),
    { name: "searchStore" }
  )
);

export const setSearchPhrase = (value: string) => {
  useSearchStore.setState((state) => ({
    ...state,
    searchPhrase: value,
    meta: {
      input: getMetaFromSearchPhrase(value),
      results: [],
    },
  }));
};

export const setResults = (results: SearchResultEvaluated[]) => {
  useSearchStore.setState((state) => ({
    ...state,
    results,
  }));
};

export const setMetaForResults = (searchPhrase: string, meta: string[]) => {
  useSearchStore.setState((state) => ({
    ...state,
    meta: {
      ...state.meta,
      results:
        state.searchPhrase === searchPhrase
          ? Array.from(new Set([...state.meta.results, ...meta]))
          : state.meta.results,
    },
  }));
};

export default useSearchStore;
