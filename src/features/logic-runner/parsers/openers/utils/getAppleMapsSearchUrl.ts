export const getAppleMapsSearchUrl = (phrase: string) =>
  `https://maps.apple.com/place?address=${encodeURI(phrase)}`;
