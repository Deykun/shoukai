import { getIsMetaWordMatching } from '@/features/search/utils/meta';

import { WikipediaResult } from "@/features/wikipedia/api/constants";

const words: {
  [tag: string]: {
    [lang: string]: string[],
  }
} = {
  movieOrBook: {
    en: ['movie', 'series', 'book', 'actor', 'actress', 'director', 'writer'],
    pl: ['film', 'seria', 'serial', 'książka', 'aktor', 'aktorka', 'reżyser', 'pisarz', 'pisarka'],
  },
  location: {
    en: ['country', 'capital', 'city', 'town'],
    pl: ['kraj', 'stolica', 'miasto', 'miejscowość'],
  },
  city: {
    en: ['capital', 'city', 'town'],
    pl: ['stolica', 'miasto', 'miejscowość'],
  },
}

export const getMetaFromWikipediaResult = (data: WikipediaResult, lang: string) => {
  if (!['en', 'pl'].includes(lang)) {
    return [];
  }

  const descriptionWords = (data?.description || '').toLowerCase().split(' ').filter(Boolean);

  if (descriptionWords.length === 0) {
    return [];
  }

  const tags: string[] = [];

  const movieOrBookWords = words?.movieOrBook?.[lang] || [];
  const locationWords = words?.location?.[lang] || [];
  const cityWords = words?.city?.[lang] || [];

  if (descriptionWords.some((descriptionWord) => getIsMetaWordMatching(descriptionWord, movieOrBookWords, []))) {
    tags.push('movie');
    tags.push('book');
  }

  if (descriptionWords.some((descriptionWord) => getIsMetaWordMatching(descriptionWord, locationWords, []))) {
    tags.push('location');

    if (descriptionWords.some((descriptionWord) => getIsMetaWordMatching(descriptionWord, cityWords, []))) {
      tags.push('city');
    }
  }

  return tags;
};
