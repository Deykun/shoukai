import {
  SearchResult,
  SearchResultEvaluated,
  SearchDirectShortcut,
  ShoukaiSearchRecipe,
} from "@/types";

import { openInNewTab } from "@/utils/url";

import { getSearchKeyAndDomainURL } from "@/features/search/utils/url";
import { setResults } from "@/features/search/stores/searchStore";

import { getResultScoreDefault } from "./default";

export const getDirectShortcutIfPresent = (
  searchPhrase: string,
  shortcuts: SearchDirectShortcut[]
) => {
  const words = searchPhrase.split(" ");

  if (words.length < 2) {
    return undefined;
  }

  const firstWord = words.at(0);
  const lastWord = words.at(-1);
  const wordsInTheMiddle = words.slice(1, -1);

  const shortcutForFirstOrLastWord = shortcuts.find(
    ({ magicWord }) => magicWord === firstWord || magicWord === lastWord
  );

  if (shortcutForFirstOrLastWord) {
    return {
      phrase: `${
        firstWord !== shortcutForFirstOrLastWord.magicWord
          ? `${firstWord} `
          : ""
      }${wordsInTheMiddle.join(" ")}${
        lastWord !== shortcutForFirstOrLastWord.magicWord ? ` ${lastWord}` : ""
      }`.trim(),
      shortcut: shortcutForFirstOrLastWord,
    };
  }

  return undefined;
};

export const getRecipesForPhrase = (
  searchPhrase: string,
  recipes: ShoukaiSearchRecipe[],
  tags: string[]
) => {
  if (tags.length === 0) {
    return recipes;
  }

  return recipes.filter(({ promoteForTags, skipForTags }) => {
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
  });
};

export const performSearch = (
  searchPhrase: string,
  recipes: ShoukaiSearchRecipe[]
) => {
  if (!searchPhrase) {
    setResults([]);

    return;
  }

  const shoukaiQuery = window.shoukaiGetQuery
    ? window.shoukaiGetQuery(searchPhrase)
    : undefined;

  const openedTabs = shoukaiQuery?.openedTabs || [];

  console.log(shoukaiQuery);

  const newOpenTabs: string[] = [];
  const newSearchKeys: string[] = [];
  let didOpenNewTab = false;

  for (const recipe of recipes) {
    const { searchKey, domainWithSearch } = getSearchKeyAndDomainURL(
      searchPhrase,
      recipe
    );

    newOpenTabs.push(domainWithSearch);
    newSearchKeys.push(searchKey);

    const wasTabOpenAlready = openedTabs.includes(domainWithSearch);

    const shouldSearch = !wasTabOpenAlready;

    if (shouldSearch) {
      didOpenNewTab = true;
      openInNewTab(domainWithSearch);
    }
  }

  if (didOpenNewTab && window.shoukaiSetQuery) {
    window.shoukaiSetQuery({
      phrase: searchPhrase,
      openedTabs: newOpenTabs,
      searchKeys: newSearchKeys,
    });
  }

  return didOpenNewTab;
};

export const indexResults = (
  searchPhrase: string,
  recipes: ShoukaiSearchRecipe[]
) => {
  if (!searchPhrase) {
    setResults([]);

    return;
  }

  let allValidResults: SearchResultEvaluated[] = [];

  for (const recipe of recipes) {
    const { searchKey } = getSearchKeyAndDomainURL(searchPhrase, recipe);

    const resultsByKey = window.shoukaiGetResultsByKey
      ? window.shoukaiGetResultsByKey()
      : {};

    if (resultsByKey[searchKey]?.results) {
      const results = resultsByKey[searchKey].results as SearchResult[];

      const getResultScore = recipe?.getResultScore || getResultScoreDefault;

      const phrase = searchPhrase.toLowerCase();
      const wordsToIgnore = recipe.wordsToIgnore || [];
      const minimumScore = recipe.minimumScore ?? 0.2;

      const scoredResults = results.map((result) => {
        const title = result.title
          .toLowerCase()
          .replace(/[\)|\-|\(|0-9]/g, " ")
          .split(" ")
          .filter((word) => word && !wordsToIgnore.includes(word))
          .join(" ");

        return {
          ...result,
          score: getResultScore({ phrase, title }),
          recipeId: recipe.id,
        };
      });

      const validResults = scoredResults.filter(
        ({ score }) => score >= minimumScore
      );

      allValidResults = [...allValidResults, ...validResults];
    }
  }

  const sortedResults = allValidResults.sort((a, b) => b.score - a.score);

  setResults(sortedResults);
};
