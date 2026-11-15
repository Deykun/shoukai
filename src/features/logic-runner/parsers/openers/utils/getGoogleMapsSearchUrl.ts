export const getGoogleMapsSearchUrl = (phrase: string) =>
  `https://www.google.com/maps/search/${encodeURI(phrase)}`;
