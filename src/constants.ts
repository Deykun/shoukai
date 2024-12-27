
import { SearchRecipe } from '@/types'

// TODO: replace with cached state
export const userRecipes: SearchRecipe[] = [
{
  name: 'Movies',
  description: 'Movie search engine.',
  svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 15h2a2 2 0 0 1 2 2v2h1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2h1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2h1v3H1v-3h1v-2a2 2 0 0 1 2-2m7-8 4 3-4 3zM4 2h16a2 2 0 0 1 2 2v9.54a3.9 3.9 0 0 0-2-.54V4H4v9c-.73 0-1.41.19-2 .54V4a2 2 0 0 1 2-2"/></svg>`,
  byLang: {
    pl: {
      name: 'Filmy',
      description: 'Wyszukiwarka filmów.',
    }
  },
  wordsToIgnore: ['filmweb'],
  options: [ {
    domain: 'https://www.duckduckgo.com/',
    getSearchUrl: (phrase, key) => `https://duckduckgo.com/?q=${encodeURI(`${phrase} site:filmweb.pl`)}&shoukaiKey=${key}`,
  }, {
    domain: 'https://www.google.com/',
    getSearchUrl: (phrase, key) => `https://www.google.com/search?q=${encodeURI(`${phrase} site:filmweb.pl`)}&shoukaiKey=${key}`,
  }],
  minimumScore: 0.75,
},
{
  name: 'Programming',
  description: 'Debuging.',
  svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16c1.1 0 2-.9 2-2V6a2 2 0 0 0-2-2m0 14H4V8h16zm-8-2c0-.55.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1M6.79 9.71a.996.996 0 0 1 1.41 0l2.59 2.59c.39.39.39 1.02 0 1.41L8.2 16.3a.996.996 0 1 1-1.41-1.41L8.67 13l-1.88-1.88a.996.996 0 0 1 0-1.41"/></svg>`,
  byLang: {
    pl: {
      name: 'Programowanie',
      description: 'Debugowanie.',
    }
  },
  wordsToIgnore: [],
  options: [ {
    domain: 'https://www.duckduckgo.com/',
    getSearchUrl: (phrase, key) => `https://duckduckgo.com/?q=${encodeURI(`${phrase} site:stackoverflow.com`)}&shoukaiKey=${key}`,
  }, {
    domain: 'https://www.google.com/',
    getSearchUrl: (phrase, key) => `https://www.google.com/search?q=${encodeURI(`${phrase} site:stackoverflow.com`)}&shoukaiKey=${key}`,
  }],
  minimumScore: 0,
},
];

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
