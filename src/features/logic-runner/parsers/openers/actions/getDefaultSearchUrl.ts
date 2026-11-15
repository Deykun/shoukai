import { SearchEngineToOpenType } from "../types";
import { getClaudeSearchUrl } from "../utils/getClaudeSearchUrl";
import { getGoogleImagesSearchUrl } from "../utils/getGoogleImagesSearchUrl";
import { getGoogleMapsSearchUrl } from "../utils/getGoogleMapsSearchUrl";
import { getGoogleSearchUrl } from "../utils/getGoogleSearchUrl";
import { getSearchUrlFromSearchEngine } from "./getSearchUrlFromSearchEngine";

const searchUrlFallbackByType: Record<
  SearchEngineToOpenType,
  (phrase: string) => string
> = {
  "search-text": getGoogleSearchUrl,
  "search-image": getGoogleImagesSearchUrl,
  "search-location": getGoogleMapsSearchUrl,
  "ask-chatbot": getClaudeSearchUrl,
};

export const getDefaultSearchUrl = (
  type: SearchEngineToOpenType,
  phrase: string,
) => {
  try {
    const { getSearchUrl } = getSearchUrlFromSearchEngine({
      searchEngineToOpen: {
        type,
        searchEngine: "defaultSearch",
      },
      phrase,
    });

    return getSearchUrl();
  } catch {
    //
  }

  const appFallbackGetSearchUrl = searchUrlFallbackByType[type];

  return appFallbackGetSearchUrl(phrase);
};
