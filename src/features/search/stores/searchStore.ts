import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { SearchResultEvaluated } from "@/types";

import { getMetaFromSearchPhrase, Tag } from "@/features/search/utils/meta";
import { getInitDataFromSearchParams } from "@/features/search/utils/url";

type SearchStoreState = {
  searchPhrase: string;
  meta: {
    input: Tag[];
    results: Tag[];
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

export const setMetaForResults = (searchPhrase: string, meta: Tag[]) => {
  useSearchStore.setState((state) => {
    if (state.searchPhrase !== searchPhrase) {
      return state;
    }

    const resultTags =
      state.meta.results.length === 0
        ? meta
        : meta.reduce((stack: Tag[], item: Tag) => {
            const index = stack.findIndex((tag) => tag.tag === item.tag);

            if (index >= 0) {
              if (item.status > stack[index].status) {
                stack[index] = {
                  ...stack[index],
                  status: item.status,
                };
              }
            } else {
              stack.push(item);
            }

            return stack;
          }, state.meta.results);

    console.log("meta", meta);
    console.log("state.meta.results", state.meta.results);
    console.log("resultTags", resultTags);

    return {
      ...state,
      meta: {
        ...state.meta,
        results: resultTags,
      },
    };
  });
};

export default useSearchStore;
