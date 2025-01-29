export const getDuckDuckGoSearchUrl = (phrase: string, key?: string) =>
  `https://duckduckgo.com/?q=${encodeURI(
    `${phrase}`
  )}${key ? `&shoukaiKey=${key}` : ''}`;

export const getGoogleSearchUrl = (phrase: string, key?: string) =>
  `https://www.google.com/search?q=${encodeURI(
    `${phrase}`
  )}${key ? `&shoukaiKey=${key}` : ''}`;

export const getGoogleImagesSearchUrl = (phrase: string, key?: string) => 
  `https://www.google.com/search?q=${encodeURI(
    `${phrase}`
  )}&tbm=isch${key ? `&shoukaiKey=${key}` : ''}`;

export const getGoogleMapsSearchUrl = (locationName: string, key?: string) => 
  `https://www.google.com/maps/search/${encodeURI(
    `${locationName}`
  )}${key ? `&shoukaiKey=${key}` : ''}`;

