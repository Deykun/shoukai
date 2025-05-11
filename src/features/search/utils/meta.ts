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

export const getHasName = (searchPhrase: string) => {
  const textSanitize = searchPhrase;

  const sanitizedWords = textSanitize.trim().split(" ").filter(Boolean);

  const hasManyWordsAndAllCapitalized = sanitizedWords.length >= 5 && sanitizedWords.every(getIsCapitalized);

  if (hasManyWordsAndAllCapitalized) {
    return false;
  }

  const sanitizedPairs = chunkPairs(sanitizedWords);

  return sanitizedPairs.some((pair) => pair.every(getIsCapitalized));
};

export const getTextStructureMatching = (searchPhrase: string) => {
  const tags: string[] = [];
  const searchPhraseSanitize = removeDoubleSpaces(searchPhrase).trim();
  const words = searchPhraseSanitize.split(" ").filter(Boolean);
  const wordCount = words.length;

  const hasYear = getHasYear(searchPhrase);
  if (hasYear) {
    tags.push('year');
  }
  const hasName = getHasName(searchPhrase);
  if (hasName) {
    tags.push('person');
  }

  return {
    tags,
    wordCount,
    hasYear,
    hasName,
  };
};

export const getMetaFromSearchPhrase = (searchPhrase: string) => {
  if (!searchPhrase) {
    return [];
  }

  const textStructure = getTextStructureMatching(searchPhrase);

  console.log(textStructure);

  const tags: string[] = textStructure.tags;
  
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
