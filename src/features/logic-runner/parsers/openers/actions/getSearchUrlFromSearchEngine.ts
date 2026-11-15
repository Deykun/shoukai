import useSearchSettingsStore from "@/features/search/stores/searchSettingsStore";
import { SearchEngineToOpen, SearchEngineToOpenType } from "../types";
import { getAppleMapsSearchUrl } from "../utils/getAppleMapsSearchUrl";
import { getBingSearchUrl } from "../utils/getBingSearchUrl";
import { getChatGPTSearchUrl } from "../utils/getChatGPTSearchUrl";
import { getClaudeSearchUrl } from "../utils/getClaudeSearchUrl";
import { getDuckDuckGoSearchUrl } from "../utils/getDuckDuckGoSearchUrl";
import { getGoogleImagesSearchUrl } from "../utils/getGoogleImagesSearchUrl";
import { getGoogleMapsSearchUrl } from "../utils/getGoogleMapsSearchUrl";
import { getGoogleSearchUrl } from "../utils/getGoogleSearchUrl";
import { getOSMSearchUrl } from "../utils/getOSMSearchUrl";
import { getYandexSearchUrl } from "../utils/getYandexSearchUrl";

type SearchUrlBuilder = (phrase: string) => string;

type SearchUrlBuilders = {
  [Type in SearchEngineToOpenType]: Partial<
    Record<
      Extract<SearchEngineToOpen, { type: Type }>["searchEngine"],
      SearchUrlBuilder
    >
  >;
};

const searchUrlBuilders: SearchUrlBuilders = {
  "search-text": {
    bing: getBingSearchUrl,
    duckduckgo: getDuckDuckGoSearchUrl,
    google: getGoogleSearchUrl,
    yandex: getYandexSearchUrl,
  },
  "search-image": {
    google: getGoogleImagesSearchUrl,
  },
  "search-location": {
    apple: getAppleMapsSearchUrl,
    google: getGoogleMapsSearchUrl,
    openstreetmap: getOSMSearchUrl,
  },
  "ask-chatbot": {
    chatgpt: getChatGPTSearchUrl,
    claude: getClaudeSearchUrl,
  },
};

type Response = {
  getSearchUrl: (phrase?: string) => string;
};

type Params = {
  searchEngineToOpen: SearchEngineToOpen;
  phrase: string | undefined;
};

export const getSearchUrlFromSearchEngine = ({
  searchEngineToOpen,
  phrase,
}: Params): Response => {
  const buildersForType: Partial<Record<string, SearchUrlBuilder>> =
    searchUrlBuilders[searchEngineToOpen.type];

  let searchEngine = searchEngineToOpen.searchEngine;
  if (searchEngine === "defaultSearch") {
    searchEngine =
      useSearchSettingsStore.getState().defaultEngines[searchEngineToOpen.type];
  }

  const getSearchUrl = buildersForType[searchEngine];
  if (!getSearchUrl) {
    throw new Error(
      `Search engine "${searchEngine}" is picked for "${searchEngineToOpen.type}" but is not yet supported.`,
    );
  }

  return {
    getSearchUrl: (passedPhrase?: string) => {
      if (phrase) {
        if (passedPhrase) {
          // TODO: replace with fully working variable replacement
          return getSearchUrl(phrase.replaceAll("{{phrase}}", passedPhrase));
        }

        return getSearchUrl(phrase);
      }

      return getSearchUrl(passedPhrase || "");
    },
  };
};
