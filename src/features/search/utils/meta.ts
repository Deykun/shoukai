import { words as devWords, prefixes as devPrefixes } from "./tags/dev";
import { words as imageWords } from "./tags/image";
import { words as movieWords } from "./tags/movie";

export const getIsMetaWordMatching = (
  phrase: string,
  words: string[],
  prefixes: string[]
) => {
  if (words.includes(phrase)) {
    return true;
  }

  if (prefixes.some((prefix) => phrase.startsWith(prefix))) {
    return true;
  }

  return false;
};

const removeDoubleSpaces = (input: string) => {
  return input.replace(/\s{2,}/g, " ");
};

const getIsYear = (text: string) => {
  // It works with 1990, 1991 - 1992, 1993-1994, (1994)
  const textSanitize = text
    .replaceAll("(", " ")
    .replaceAll(")", " ")
    .replaceAll("-", " ");

  const sanitizedPhrases = textSanitize.trim().split(" ").filter(Boolean);

  return sanitizedPhrases.some(
    (phrase) => phrase.length === 4 && text.match(/\d{4}/)?.[0]
  );
};

export const getTextStructureMatching = (searchPhrase: string) => {
  const searchPhraseSanitize = removeDoubleSpaces(searchPhrase).trim();
  const words = searchPhraseSanitize.split(" ").filter(Boolean);
  const wordCount = words.length;

  const hasYear = words.some(getIsYear);

  return {
    wordCount,
    hasYear,
  };
};

export const getMetaFromSearchPhrase = (searchPhrase: string) => {
  if (!searchPhrase) {
    return [];
  }

  const tags: string[] = [];

  const searchPhraseWords = searchPhrase
    .toLowerCase()
    .split(" ")
    .filter(Boolean);

  if (
    searchPhraseWords.some((searchPhraseWord) =>
      getIsMetaWordMatching(searchPhraseWord, devWords, devPrefixes)
    )
  ) {
    tags.push("dev");
  }

  if (
    searchPhraseWords.some((searchPhraseWord) =>
      getIsMetaWordMatching(searchPhraseWord, imageWords, [])
    )
  ) {
    tags.push("image");
  }

  if (
    searchPhraseWords.some((searchPhraseWord) =>
      getIsMetaWordMatching(searchPhraseWord, movieWords, [])
    )
  ) {
    tags.push("movie");
  }

  const isSomeKindOfDate = searchPhraseWords.some((searchPhraseWord) => {
    const number = searchPhraseWord.match(/\d+/)?.[0];

    return (
      number &&
      number.length === 4 &&
      (number.startsWith("19") || number.startsWith("20"))
    );
  });

  if (isSomeKindOfDate) {
    if (!tags.includes("movie")) {
      tags.push("movie");
    }

    tags.push("year");
  }

  return tags;
};
