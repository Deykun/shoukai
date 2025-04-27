import { SearchRecipe } from "@/types";

import {
  getDuckDuckGoSearchUrl,
  getGoogleSearchUrl,
} from "@/features/search/utils/search";

export const recipe: SearchRecipe = {
  id: "movies",
  name: "Movies",
  description: "Movie search engine.",
  svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm4-2v16m8-16v16M4 8h4m-4 8h4m-4-4h16m-4-4h4m-4 8h4"/></svg>`,
  byLang: {
    pl: {
      name: "Filmy",
      description: "Wyszukiwarka filmów.",
    },
  },
  promoteForTags: ["movie"],
  skipForTags: ["dev", "location"],
  wordsToIgnore: ["filmweb"],
  options: [
    {
      domain: "https://www.duckduckgo.com/",
      getSearchUrl: (phrase, key) =>
        getDuckDuckGoSearchUrl(`${phrase} site:filmweb.pl`, key),
    },
    {
      domain: "https://www.google.com/",
      getSearchUrl: (phrase, key) =>
        getGoogleSearchUrl(`${phrase} site:filmweb.pl`, key),
    },
  ],
  minimumScore: 0.75,
};
