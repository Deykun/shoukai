import { MANY_RESULTS_API_RESPONSE } from "@/features/wikipedia/api/constants";

export type WikipediaResult = {
  title: string;
  thumbnail?: string;
  description?: string;
  thumbnailStyle?: React.CSSProperties;
};

const commonParams = `&limit=2&namespace=0&origin=*&format=json&formatversion=2`;

const fetchFromWikipedia = async (
  searchPhrase: string,
  lang = "en",
  { isFirst = true } = {}
): Promise<null | WikipediaResult> => {
  let responseToReturn = null;
  let hasMany = false;

  try {
    // https://www.mediawiki.org/wiki/API:Page_info_in_search_results
    const response = await fetch(
      `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURI(
        searchPhrase
      )}&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=600${commonParams}`,
      {
        method: "GET",
      }
    );
    const rawData = await response.json();

    const result = rawData?.query?.pages[0];

    const hasResult = result.missing !== true;

    if (hasResult) {
      const thumbnail = result?.thumbnail?.source;
      const description = result?.terms?.description?.[0] || result?.terms?.alias?.[0] || "";

  
      hasMany = MANY_RESULTS_API_RESPONSE[lang].includes(description);

      responseToReturn = {
        title: result.title,
        thumbnail,
        thumbnailStyle: {
          aspectRatio: `${result?.thumbnail?.width || 1}/${
            result?.thumbnail?.height || 1
          }`,
        },
        description,
      };

      if (!hasMany || !isFirst) {
        return responseToReturn;
      }
    }
  } catch {}

  if (isFirst) {
    // https://www.mediawiki.org/wiki/API%3aOpensearch
    try {
      const response = await fetch(
        `https://${lang}.wikipedia.org/w/api.php?action=opensearch&search=${encodeURI(
          searchPhrase
        )}${commonParams}`,
        {
          method: "GET",
        }
      );
      const rawData = await response.json();

      let matchedPhrase =
        rawData.length > 1 && rawData[1].length > 0 ? rawData[1][0] : "";

      const shouldCheckAlternativePhrase = hasMany && matchedPhrase.toLowerCase() === searchPhrase.toLowerCase();
      if (shouldCheckAlternativePhrase) {
        if (rawData[1][1]?.trim()) {
          matchedPhrase = rawData[1][1]?.trim();
        }
      }

      if (matchedPhrase) {
        const response = await fetchFromWikipedia(matchedPhrase, lang, { isFirst: false });

        if (response) {
          return response;
        }
      }
    } catch {}
  }

  return responseToReturn;
};

const cachedResults: {
  [phrase: string]: WikipediaResult;
} = {};

const missingResults: string[] = [];

export const getWikipediaResult = async (
  searchPhrase: string,
  lang = "en",
): Promise<null | WikipediaResult> => {
  if (!searchPhrase) {
    return null;
  }

  if (searchPhrase.includes('site:')) {
    return null;
  }

  if (cachedResults[searchPhrase]) {
    return cachedResults[searchPhrase];
  }

  if (missingResults.includes(searchPhrase)) {
    return null;
  }

  const response = await fetchFromWikipedia(searchPhrase, lang, { isFirst: true });

  if (response) {
    cachedResults[searchPhrase] = response;
  } else {
    missingResults.push(searchPhrase);
  }

  return response;
};