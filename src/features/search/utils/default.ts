import { GetResultScoreParams } from '@/types';

export const getResultScoreDefault = ({ phrase, title }: GetResultScoreParams) => {
  if (phrase === title) {
    return 1;
  }

  if (title.includes(phrase)) {
    return phrase.length / title.length;
  }

  return 0;
};
