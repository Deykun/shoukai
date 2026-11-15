export const getGoogleSearchUrl = (phrase: string) =>
  `https://www.google.com/search?q=${encodeURI(phrase)}`;
