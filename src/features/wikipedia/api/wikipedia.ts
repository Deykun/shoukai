
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
      const description = result?.terms?.description[0] || "";

      if (thumbnail || description) {
        return {
          title: result.title,
          thumbnail: result?.thumbnail?.source, // .width nd .height are available
          thumbnailStyle: {
            aspectRatio: `${result?.thumbnail?.width || 1}/${
              result?.thumbnail?.height || 1
            }`,
          },
          description,
        };
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

      const matchedPhrase =
        rawData.length > 1 && rawData[1].length > 0 ? rawData[1][0] : "";

      if (matchedPhrase) {
        const response = await getWikipediaResult(matchedPhrase, lang, { isFirst: false });

        return response;
      }
    } catch {}
  }

  return null;
};

const cachedResults: {
  [phrase: string]: WikipediaResult;
} = {};

const missingResults: string[] = [];

export const getWikipediaResult = async (
  searchPhrase: string,
  lang = "en",
  { isFirst = true } = {}
): Promise<null | WikipediaResult> => {
  if (!searchPhrase) {
    return null;
  }

  if (cachedResults[searchPhrase]) {
    return cachedResults[searchPhrase];
  }

  if (missingResults.includes(searchPhrase)) {
    return null;
  }

  const response = await fetchFromWikipedia(searchPhrase, lang, { isFirst });

  if (response) {
    cachedResults[searchPhrase] = response;
  } else {
    missingResults.push(searchPhrase);
  }

  return response;
};