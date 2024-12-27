import { words as devWords, prefixes as devPrefixes } from './tags/dev';
import { words as imageWords } from './tags/image';
import { words as movieWords } from './tags/movie';

export const getIsMetaWordMatching = (phrase: string, words: string[], prefixes: string[]) => {
  if (words.includes(phrase)) {
    return true;
  }

  if (prefixes.some((prefix) => phrase.startsWith(prefix))) {
    return true;
  }

  return false;
}

export const getMetaFromSearchPhrase = (searchPhrase: string) => {
  if (!searchPhrase) {
    return [];
  }

  const tags: string[] = [];
  
  const searchPhraseWords = searchPhrase.toLowerCase().split(' ').filter(Boolean);

  if (searchPhraseWords.some((searchPhraseWord) => getIsMetaWordMatching(searchPhraseWord, devWords, devPrefixes))) {
    tags.push('dev');
  }

  if (searchPhraseWords.some((searchPhraseWord) => getIsMetaWordMatching(searchPhraseWord, imageWords, []))) {
    tags.push('image');
  }

  if (searchPhraseWords.some((searchPhraseWord) => getIsMetaWordMatching(searchPhraseWord, movieWords, []))) {
    tags.push('movie');
  }

  const isSomeKindOfDate = searchPhraseWords.some((searchPhraseWord) => {
    const number = searchPhraseWord.match(/\d+/)?.[0];

    return number && number.length === 4 && (number.startsWith('19') || number.startsWith('20'))
  });

  if (isSomeKindOfDate) {
    if (!tags.includes('movie')) {    
      tags.push('movie')
    }

    tags.push('year');
  }

  return tags;
}