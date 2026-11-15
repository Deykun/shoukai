export const getDuckDuckGoSearchUrl = (phrase: string) =>
  `https://duckduckgo.com/?q=${encodeURI(phrase)}`;
