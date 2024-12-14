
import { SearchRecipe } from '@/types'

// TODO: replace with cached state
export const recipes: SearchRecipe[] = [{
  name: 'Filmweb',
  options: [ {
    name: 'filmweb.pl',
    domain: 'https://www.duckduckgo.com/',
    getSearchUrl: (phrase, key) => `https://duckduckgo.com/?q=${encodeURI(`${phrase} site:filmweb.pl`)}&shoukaiKey=${key}`,
  }, {
    name: 'filmweb.pl',
    domain: 'https://www.google.com/',
    getSearchUrl: (phrase, key) => `https://www.google.com/search?q=${encodeURI(`${phrase} site:filmweb.pl`)}&shoukaiKey=${key}`,
  }],
}];

export const PATHS_DATA: {
  type?: string,
  pathNameLink: string,
  path: string,
  title: string,
  social: string,
  lang: string,
}[] = [
] as const;

export const LOCAL_STORAGE = {
  'SHOUKAI_UPDATE': 'SHOUKAI_UPDATE',
  'SHOUKAI_USER_LANG': 'SHOUKAI_USER_LANG',
} as const;
