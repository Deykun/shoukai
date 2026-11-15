import { SearchDirectShortcut, SearchDirectShortcutsIndex } from "@/types";

import {
  getDuckDuckGoSearchUrl,
  getGoogleSearchUrl,
  getGoogleImagesSearchUrl,
  getGoogleMapsSearchUrl,
} from "@/features/search/utils/search";

import { getChatGPTAskUrl } from "./features/search/utils/ask";
import { SupportedShoukaiSearchEngineText } from "./types/supported/text-engines";
import { getShortcutsFromStart } from "./features/logic-runner/parsers/shortcuts/actions/getShortcutsFromStart";

export const supportedSearchEngines: SupportedShoukaiSearchEngineText[] = [
  "bing",
  "duckduckgo",
  "google",
  "yandex",
];

export const supportedSearchEnginesParsers: SupportedShoukaiSearchEngineText[] =
  ["duckduckgo", "google", "yandex"];

const getDirectShortcutsForMagicWords = (
  magicWords: string[],
  getter: (phrase: string) => string,
) => {
  return magicWords.reduce(
    (
      stack: {
        [magicWord: string]: SearchDirectShortcut;
      },
      word,
    ) => {
      stack[word] = {
        magicWord: word,
        getSearchUrl: getter,
      };

      return stack;
    },
    {},
  );
};

// TODO: move to editable setting
export const directShortcutByKey: SearchDirectShortcutsIndex =
  getShortcutsFromStart() || {
    ...getDirectShortcutsForMagicWords(["d"], (phrase: string) =>
      getDuckDuckGoSearchUrl(phrase),
    ),
    ...getDirectShortcutsForMagicWords(["g", "google"], (phrase: string) =>
      getGoogleSearchUrl(phrase),
    ),
    ...getDirectShortcutsForMagicWords(["img"], (phrase: string) =>
      getGoogleImagesSearchUrl(phrase),
    ),
    ...getDirectShortcutsForMagicWords(["?"], (phrase: string) =>
      getChatGPTAskUrl(phrase),
    ),
    ...getDirectShortcutsForMagicWords(["gm"], (phrase: string) =>
      getGoogleMapsSearchUrl(phrase),
    ),
  };

export const directShortcuts = Object.values(directShortcutByKey);

export { PATHS_DATA } from "./paths-data";

export const LOCAL_STORAGE = {
  SHOUKAI_UPDATE: "SHOUKAI_UPDATE",
  SHOUKAI_USER_LANG: "SHOUKAI_USER_LANG",
} as const;
