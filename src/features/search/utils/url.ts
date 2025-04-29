import { ShoukaiSearchRecipe } from "@/types";
import { getSearchKey } from "@/features/search/api/search";
import { SupportedSearchEngine } from "@/constants";
import { getSearchUrlGetterBySearchEngine } from "./search";

type SupportedParams = {
  searchPhrase: string;
};

export const getInitDataFromSearchParams = () => {
  let init: SupportedParams = {
    searchPhrase: "",
  };

  const searchParams = new URL(location.href).searchParams;

  if (searchParams.has("s")) {
    init.searchPhrase = decodeURI(searchParams.get("s") || "");
  }

  return init;
};

export const getSearchParamsFromData = ({ searchPhrase }: SupportedParams) => {
  const searchParts = [];

  if (searchPhrase) {
    searchParts.push(`s=${encodeURI(searchPhrase)}`);
  }

  return `?${searchParts.join("&")}`;
};

export const getSearchKeyAndDomainURL = (
  searchPhrase: string,
  recipe: ShoukaiSearchRecipe
) => {
  const getSearchUrl = getSearchUrlGetterBySearchEngine(
    recipe.searchEngine || ""
  );

  const phraseTemplate = recipe.searchOptions[recipe.searchEngine || 'default'] || recipe.searchOptions.default;

  const lowerCasedSearchPhrase = searchPhrase.toLowerCase();
  const phraseToSearch = phraseTemplate.replace('[phrase]', lowerCasedSearchPhrase);



  const searchKey = getSearchKey(
    phraseToSearch,
    getSearchUrl(searchPhrase, "seed")
  );
  const domainWithSearch = getSearchUrl(phraseToSearch, searchKey);

  return {
    searchKey,
    domainWithSearch,
  };
};
