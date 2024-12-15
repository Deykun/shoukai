
import { SearchRecipe, SearchResult } from '@/types';
import { getSearchKey } from '@/features/search/api/search';

type SupportedParams = {
  searchPhrase: string,
}

export const getInitDataFromSearchParams = () => {
  let init: SupportedParams = {
    searchPhrase: '',
  };

  const searchParams = new URL(location.href).searchParams;

  if (searchParams.has('s')) {
    init.searchPhrase = decodeURI(searchParams.get('s') || '');
  }

  return init;
};

export const getSearchParamsFromData = ({ searchPhrase }: SupportedParams) => {
  const searchParts = [];

  if (searchPhrase) {
    searchParts.push(`s=${encodeURI(searchPhrase)}`);
  }

  return `?${searchParts.join('&')}`;
};

export const getSearchKeyAndDomainURL = (searchPhrase: string, recipe: SearchRecipe) => {
  const lowerCasedSearchPhrase = searchPhrase.toLowerCase();
  const searchKey = getSearchKey(lowerCasedSearchPhrase, recipe.options[0].domain);
  const domainWithSearch = recipe.options[0].getSearchUrl(lowerCasedSearchPhrase, searchKey);

  return {
    searchKey,
    domainWithSearch,
  }
}
