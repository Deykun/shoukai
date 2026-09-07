import { MANY_RESULTS_API_RESPONSE, WikipediaResult } from "@/features/wikipedia/api/constants";

const commonParams = `&limit=2&namespace=0&origin=*&format=json&formatversion=2`;

const fetchFromWikipedia = async (
  searchPhrase: string,
  lang = "en",
  { isFirst = true } = {}
): Promise<null | WikipediaResult> => {
  let responseToReturn = null;
  let shouldCheckAlternative = false;

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

      const hasMany = MANY_RESULTS_API_RESPONSE[lang].includes(description);
      const hasContent = thumbnail || (description && description !== searchPhrase)

      shouldCheckAlternative = hasMany || !hasContent;

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

      if (!shouldCheckAlternative || !isFirst) {
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

      const shouldCheckAlternativePhrase = shouldCheckAlternative && matchedPhrase.toLowerCase() === searchPhrase.toLowerCase();
      if (shouldCheckAlternativePhrase) {
        if (rawData[1][1]?.trim()) {
          matchedPhrase = rawData[1][1]?.trim();
        }
      }

      if (matchedPhrase !== searchPhrase) {
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

  const cacheKey = `${lang} ${searchPhrase}`;

  if (cachedResults[cacheKey]) {
    return cachedResults[cacheKey];
  }

  if (missingResults.includes(cacheKey)) {
    return null;
  }

  const response = await fetchFromWikipedia(searchPhrase, lang, { isFirst: true });

  if (response) {
    cachedResults[cacheKey] = response;
  } else {
    missingResults.push(cacheKey);
  }

  return response;
};