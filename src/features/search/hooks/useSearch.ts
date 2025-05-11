import { useCallback, useEffect, useState } from "react";

import { ShoukaiQuery, SearchResult } from "@/types";
import { directShortcuts } from "@/constants";

import {
  getRecipesForPhrase,
  getDirectShortcutIfPresent,
  performSearch,
  indexResults,
} from "@/features/search/utils/actions";
import useSearchStore, {
  setResults,
} from "@/features/search/stores/searchStore";
import useSearchSettingsStore, {
  selectUserRecipes,
} from "@/features/search/stores/searchSettingsStore";
import { openInNewTab } from "@/utils/url";

declare global {
  interface Window {
    shoukaiReset?: () => void,
    shoukaiGetResultsByKey?: () => {
      [key: string]: {
        date: string;
        results: SearchResult[];
      };
    };
    shoukaiGetQueries?: () => {
      [stamp: string]: {
        [phrase: string]: ShoukaiQuery;
      };
    };
    shoukaiGetQuery?: (phrase: string) => ShoukaiQuery | undefined;
    shoukaiSetQuery?: (phrase: string, openedTabs: string[]) => void;
  }
}

export default function useSearch() {
  const shouldOpenNewTabForResults = useSearchSettingsStore(
    (state) => state.shouldOpenNewTabForResults
  );
  const recipes = useSearchSettingsStore(selectUserRecipes);
  const searchPhrase = useSearchStore((state) => state.searchPhrase);
  const tags = useSearchStore((state) => [
    ...state.meta.input,
    ...state.meta.results,
  ]);
  const directShortcut = getDirectShortcutIfPresent(
    searchPhrase,
    directShortcuts
  );
  const [searchConfig, setSearchConfig] = useState({
    phrase: searchPhrase || "",
    recipes: directShortcut
      ? []
      : getRecipesForPhrase(searchPhrase, recipes, tags),
  });

  useEffect(() => {
    setResults([]);

    if (directShortcut) {
      location.href = directShortcut.shortcut.getSearchUrl(
        directShortcut.phrase
      );

      return;
    }

    if (searchPhrase !== searchConfig.phrase) {
      if (searchPhrase) {
        setSearchConfig({
          phrase: searchPhrase,
          recipes: directShortcut
            ? []
            : getRecipesForPhrase(searchPhrase, recipes, tags),
        });
      } else {
        setSearchConfig({
          phrase: "",
          recipes: [],
        });
      }
    }
  }, [searchPhrase]);

  useEffect(() => {
    if (searchConfig.phrase && searchConfig.recipes.length > 0) {
      const didOpenNewTab = performSearch(searchPhrase, searchConfig.recipes);

      if (shouldOpenNewTabForResults && didOpenNewTab) {
        // Opens a new tab after all others and closes the current one to keep search results at the top
        setTimeout(() => {
          openInNewTab(location.href);
          window.close();
        }, 10);
      }
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

  const handleStorageUpdate = useCallback(
    (event: StorageEvent) => {
      if (event) {
        setTimeout(cachedIndexResults, 10);
      }
    },
    [searchConfig]
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorageUpdate);

    return () => window.removeEventListener("storage", handleStorageUpdate);
  }, [handleStorageUpdate]);
}
