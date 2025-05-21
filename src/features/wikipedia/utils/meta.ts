import { getIsMetaWordMatching, Tag } from "@/features/search/utils/meta";

import { WikipediaResult } from "@/features/wikipedia/api/constants";

const words: {
  [tag: string]: {
    [lang: string]: string[];
  };
} = {
  book: {
    en: ["book", "writer"],
    pl: ["książka", "pisarz", "pisarka", "pisarki", "pisarza"],
  },
  movie: {
    en: ["movie", "series", "actor", "actress", "director"],
    pl: ["film", "seria", "serial", "aktor", "aktorka", "reżyser"],
  },
  music: {
    en: ["song", "songs"],
    pl: [
      "piosenka",
      "piosenki",
      "zespół",
      "wokalista",
      "wokalistka",
      "piosenkarka",
      "piosenkarz",
      "raper",
      "muzyka",
      "muzyki",
      "dźwiękowa",
      "dźwiękowej",
    ],
  },
  location: {
    en: ["country", "capital", "city", "town"],
    pl: ["kraj", "stolica", "miasto", "miejscowość"],
  },
  city: {
    en: ["capital", "city", "town"],
    pl: ["stolica", "miasto", "miejscowość"],
  },
};

export const getMetaFromWikipediaResult = (
  data: WikipediaResult,
  lang: string
) => {
  if (!["en", "pl"].includes(lang)) {
    return [];
  }

  const descriptionWords = (data?.description || "")
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(",", "").replace(".", ""))
    .filter(Boolean);

  if (descriptionWords.length === 0) {
    return [];
  }

  const tags: Tag[] = [];

  const movieWords = words?.movie?.[lang] || [];
  const bookWords = words?.book?.[lang] || [];
  const musicWords = words?.music?.[lang] || [];
  const locationWords = words?.location?.[lang] || [];
  const cityWords = words?.city?.[lang] || [];

  if (
    descriptionWords.some((descriptionWord) =>
      getIsMetaWordMatching(descriptionWord, bookWords, [])
    )
  ) {
    tags.push({
      tag: "book",
      status: 1,
    });
  }

  if (
    descriptionWords.some((descriptionWord) =>
      getIsMetaWordMatching(descriptionWord, movieWords, [])
    )
  ) {
    tags.push({
      tag: "movie",
      status: 1,
    });
  }

  if (
    descriptionWords.some((descriptionWord) =>
      getIsMetaWordMatching(descriptionWord, musicWords, [])
    )
  ) {
    tags.push({
      tag: "music",
      status: 1,
    });
  }

  if (
    descriptionWords.some((descriptionWord) =>
      getIsMetaWordMatching(descriptionWord, locationWords, [])
    )
  ) {
    tags.push({
      tag: "location",
      status: 1,
    });

    if (
      descriptionWords.some((descriptionWord) =>
        getIsMetaWordMatching(descriptionWord, cityWords, [])
      )
    ) {
      tags.push({
        tag: "city",
        status: 1,
      });
    }
  }

  return tags;
};
