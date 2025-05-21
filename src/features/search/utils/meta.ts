import { words as devWords, prefixes as devPrefixes } from "./tags/dev";
import { words as imageWords } from "./tags/image";
import { words as movieWords } from "./tags/movie";

type TagStatus = 0 | 0.5 | 1;

export type Tag = {
  tag: string;
  status: TagStatus;
};

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

export const getHasDigit = (searchPhrase: string) => {
  return /\d/.test(searchPhrase);
};

export const getIsDecimalStatus = (searchPhrase: string) => {
  const value = ` ${searchPhrase} `;
  const isExactDecimal = / \d+\.\d+ /.test(value) || / \d+\,\d+ /.test(value);

  if (isExactDecimal) {
    return 1;
  }

  const isMaybeDecimal = /\d\.\d/.test(value) || /\d\,\d/.test(value);

  return isMaybeDecimal ? 0.5 : 0;
};

export const getIsCapitalized = (input: string) => {
  const lowerCaseInput = input.toLowerCase();

  return (
    lowerCaseInput.slice(0, 1) !== input.slice(0, 1) &&
    lowerCaseInput.slice(1) === input.slice(1)
  );
};

export const getHasYear = (searchPhrase: string) => {
  const textSanitize = searchPhrase
    .replaceAll("(", " ")
    .replaceAll(")", " ")
    .replaceAll("-", " ")
    .replaceAll(".", " ");

  const sanitizedPhrases = textSanitize.trim().split(" ").filter(Boolean);

  return sanitizedPhrases.some(
    (phrase) => phrase.length === 4 && phrase.match(/\d{4}/)?.[0]
  );
};

const chunkPairs = (arr: string[]) => {
  const result: [string, string][] = [];
  for (let i = 0; i < arr.length - 1; i++) {
    result.push([arr[i], arr[i + 1]]);
  }
  return result;
};

export const getHasNameStatus = (searchPhrase: string) => {
  const textSanitize = searchPhrase;

  const sanitizedWords = textSanitize.trim().split(" ").filter(Boolean);

  const hasManyWordsAndAllCapitalized =
    sanitizedWords.length >= 5 && sanitizedWords.every(getIsCapitalized);

  if (hasManyWordsAndAllCapitalized) {
    return 0;
  }

  if (sanitizedWords.length === 2) {
    const hasDigits = sanitizedWords.some(getHasDigit);

    if (hasDigits) {
      return 0;
    }

    if (sanitizedWords.every(getIsCapitalized)) {
      return 1;
    }

    return 0.5;
  }

  const sanitizedPairs = chunkPairs(sanitizedWords);

  return sanitizedPairs.some((pair) => pair.every(getIsCapitalized)) ? 1 : 0;
};

export const getTextStructureMatching = (searchPhrase: string) => {
  const tags: Tag[] = [];
  const searchPhraseSanitize = removeDoubleSpaces(searchPhrase).trim();
  const words = searchPhraseSanitize.split(" ").filter(Boolean);
  const wordCount = words.length;

  const hasDigits = getHasDigit(searchPhrase);
  if (hasDigits) {
    tags.push({
      tag: "number",
      status: 1,
    });

    const decimalStatus = getIsDecimalStatus(searchPhrase);
    if (decimalStatus > 0) {
      tags.push({
        tag: "decimal",
        status: decimalStatus,
      });
    }
  }

  const hasYear = getHasYear(searchPhrase);
  if (hasYear) {
    tags.push({
      tag: "year",
      status: 1,
    });
  }

  const nameStatus = getHasNameStatus(searchPhrase);
  if (nameStatus > 0) {
    tags.push({
      tag: "person",
      status: nameStatus,
    });
  }

  return {
    tags,
    wordCount,
  };
};

export const getMetaFromSearchPhrase = (searchPhrase: string) => {
  if (!searchPhrase) {
    return [];
  }

  const textStructure = getTextStructureMatching(searchPhrase);

  const tags: Tag[] = textStructure.tags;

  const searchPhraseWords = searchPhrase
    .toLowerCase()
    .split(" ")
    .filter(Boolean);

  if (
    searchPhraseWords.some((searchPhraseWord) =>
      getIsMetaWordMatching(searchPhraseWord, devWords, devPrefixes)
    )
  ) {
    tags.push({
      tag: "dev",
      status: 1,
    });
  }

  if (
    searchPhraseWords.some((searchPhraseWord) =>
      getIsMetaWordMatching(searchPhraseWord, imageWords, [])
    )
  ) {
    tags.push({
      tag: "image",
      status: 1,
    });
  }

  if (
    searchPhraseWords.some((searchPhraseWord) =>
      getIsMetaWordMatching(searchPhraseWord, movieWords, [])
    )
  ) {
    tags.push({
      tag: "movie",
      status: 1,
    });
  }

  return tags;
};
