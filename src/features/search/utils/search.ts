import { SupportedSearchEngine } from "@/constants";

export const getBingSearchUrl = (phrase: string, key?: string) =>
  `https://www.bing.com/search?q=${encodeURI(`${phrase}`)}${
    key ? `&shoukaiKey=${key}` : ""
  }`;

export const getDuckDuckGoSearchUrl = (phrase: string, key?: string) =>
  `https://duckduckgo.com/?q=${encodeURI(`${phrase}`)}${
    key ? `&shoukaiKey=${key}` : ""
  }`;

export const getGoogleSearchUrl = (phrase: string, key?: string) =>
  `https://www.google.com/search?q=${encodeURI(`${phrase}`)}${
    key ? `&shoukaiKey=${key}` : ""
  }`;

export const getGoogleImagesSearchUrl = (phrase: string, key?: string) =>
  `https://www.google.com/search?q=${encodeURI(`${phrase}`)}&tbm=isch${
    key ? `&shoukaiKey=${key}` : ""
  }`;

export const getGoogleMapsSearchUrl = (locationName: string, key?: string) =>
  `https://www.google.com/maps/search/${encodeURI(`${locationName}`)}${
    key ? `&shoukaiKey=${key}` : ""
  }`;

export const getYandexSearchUrl = (phrase: string, key?: string) =>
  `https://yandex.com/search/?text=${encodeURI(`${phrase}`)}${
    key ? `&shoukaiKey=${key}` : ""
  }`;

export const getSearchUrlGetterBySearchEngine = (
  searchEngine: '' | SupportedSearchEngine
) => {
  if (searchEngine === 'bing') {
    return getBingSearchUrl;
  }

  if (searchEngine === 'duckduckgo') {
    return getDuckDuckGoSearchUrl;
  }

  if (searchEngine === 'google') {
    return getGoogleSearchUrl;
  }

  if (searchEngine === 'yandex') {
    return getYandexSearchUrl;
  }

  // TODO: decide which search engine should be used as fallback
  return getGoogleSearchUrl;
};
