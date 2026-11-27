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

const getPhraseWithoutTrigger = (
  searchPhrase: string,
  shortcut: ShoukaiShortcut,
): string | undefined => {
  const { place, shouldRequireSpace } = shortcut.detectionStrategy;
  const words = searchPhrase.trim().split(/\s+/);
  const phrase = words.join(" ");
  // Longest first, so "google" wins over "g" when space is not required
  const triggers = shortcut.triggers
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  if (place === "middle") {
    const triggerIndex = words.findIndex(
      (word, index) =>
        index > 0 && index < words.length - 1 && triggers.includes(word),
    );

    return triggerIndex === -1
      ? undefined
      : words.filter((_, index) => index !== triggerIndex).join(" ");
  }

  const space = shouldRequireSpace ? " " : "";

  if (place !== "end") {
    const trigger = triggers.find((trigger) =>
      phrase.startsWith(`${trigger}${space}`),
    );
    const phraseToUse = trigger && phrase.slice(trigger.length).trim();

    if (phraseToUse) {
      return phraseToUse;
    }
  }

  if (place !== "start") {
    const trigger = triggers.find((trigger) =>
      phrase.endsWith(`${space}${trigger}`),
    );
    const phraseToUse = trigger && phrase.slice(0, -trigger.length).trim();

    if (phraseToUse) {
      return phraseToUse;
    }
  }

  return undefined;
};

export const getShortcutStatus = (
  searchPhrase: string,
  shortcut: ShoukaiShortcut,
): Response => {
  const phraseToUse = getPhraseWithoutTrigger(searchPhrase, shortcut);

  if (!phraseToUse) {
    return { isActive: false };
  }

  const { getSearchUrl } = getSearchUrlFromSearchEngine({
    searchEngineToOpen: shortcut,
    phrase: shortcut.phrase,
  });

  return { isActive: true, phraseToUse, getSearchUrl };
};
