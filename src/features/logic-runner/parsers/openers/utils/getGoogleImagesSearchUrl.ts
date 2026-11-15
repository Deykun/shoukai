export const getGoogleImagesSearchUrl = (phrase: string) =>
  `https://www.google.com/search?q=${encodeURI(phrase)}&tbm=isch`;
