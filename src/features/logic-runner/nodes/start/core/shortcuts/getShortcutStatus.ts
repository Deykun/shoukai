import { ShoukaiShortcut } from "@/features/logic/nodes/type/schema";

import { getSearchUrlFromSearchEngine } from "@/features/logic-runner/parsers/openers/actions/getSearchUrlFromSearchEngine";

type Response =
  | {
      isActive: true;
      phraseToUse: string;
      getSearchUrl: (phrase: string) => string;
    }
  | {
      isActive: false;
    };

export const getShortcutStatus = (
  searchPhrase: string,
  shortcut: ShoukaiShortcut,
): Response => {
  const words = searchPhrase.trim().split(/\s+/);

  if (words.length > 1) {
    const firstWord = words[0];
    const lastWord = words[words.length - 1];

    let phraseWords: string[] | undefined;
    if (shortcut.triggers.includes(firstWord)) {
      phraseWords = words.slice(1);
    } else if (shortcut.triggers.includes(lastWord)) {
      phraseWords = words.slice(0, -1);
    }

    if (phraseWords) {
      const { getSearchUrl } = getSearchUrlFromSearchEngine({
        searchEngineToOpen: shortcut,
        phrase: shortcut.phrase,
      });

      return {
        isActive: true,
        phraseToUse: phraseWords.join(" "),
        getSearchUrl,
      };
    }
  }

  return { isActive: false };
};
