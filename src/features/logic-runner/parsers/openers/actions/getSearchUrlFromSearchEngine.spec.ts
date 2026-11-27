import { beforeEach, describe, expect, it, vi } from "vitest";
import { getSearchUrlFromSearchEngine } from "./getSearchUrlFromSearchEngine";
import { SearchEngineToOpen } from "../types";

const mockState = vi.hoisted(() => ({
  defaultEngines: {} as Record<string, string>,
}));

vi.mock("@/features/search/stores/searchSettingsStore", () => ({
  default: { getState: () => mockState },
}));

const resetDefaults = () => {
  mockState.defaultEngines = {
    "search-text": "google",
    "search-image": "google",
    "search-location": "google",
    "ask-chatbot": "chatgpt",
  };
};

const getUrl = (
  searchEngineToOpen: SearchEngineToOpen,
  phrase?: string,
  passedPhrase?: string,
) =>
  getSearchUrlFromSearchEngine({ searchEngineToOpen, phrase }).getSearchUrl(
    passedPhrase,
  );

describe("getSearchUrlFromSearchEngine", () => {
  beforeEach(resetDefaults);

  describe("engine selection", () => {
    it.each<[SearchEngineToOpen, string]>([
      [
        { type: "search-text", searchEngine: "google" },
        "https://www.google.com/search?q=cat",
      ],
      [
        { type: "search-text", searchEngine: "bing" },
        "https://www.bing.com/search?q=cat",
      ],
      [
        { type: "search-image", searchEngine: "google" },
        "https://www.google.com/search?q=cat&tbm=isch",
      ],
      [
        { type: "search-location", searchEngine: "google" },
        "https://www.google.com/maps/search/cat",
      ],
      [
        { type: "ask-chatbot", searchEngine: "chatgpt" },
        "https://chatgpt.com/?q=cat",
      ],
    ])("builds url for %o", (searchEngineToOpen, expected) => {
      expect(getUrl(searchEngineToOpen, "cat")).toBe(expected);
    });

    it("uses default engine from store for defaultSearch", () => {
      mockState.defaultEngines["search-text"] = "bing";

      expect(
        getUrl({ type: "search-text", searchEngine: "defaultSearch" }, "cat"),
      ).toBe("https://www.bing.com/search?q=cat");
    });

    it("resolves default per type", () => {
      expect(
        getUrl({ type: "search-image", searchEngine: "defaultSearch" }, "cat"),
      ).toBe("https://www.google.com/search?q=cat&tbm=isch");
      expect(
        getUrl({ type: "ask-chatbot", searchEngine: "defaultSearch" }, "cat"),
      ).toBe("https://chatgpt.com/?q=cat");
    });

    it("throws for engine unsupported in given type", () => {
      mockState.defaultEngines["search-image"] = "bing";

      expect(() =>
        getSearchUrlFromSearchEngine({
          searchEngineToOpen: {
            type: "search-image",
            searchEngine: "defaultSearch",
          },
          phrase: "cat",
        }),
      ).toThrow('Search engine "bing" is picked for "search-image"');
    });
  });

  describe("phrase handling", () => {
    const google: SearchEngineToOpen = {
      type: "search-text",
      searchEngine: "google",
    };

    it("uses phrase when nothing passed", () => {
      expect(getUrl(google, "cat")).toBe("https://www.google.com/search?q=cat");
    });

    it("uses passed phrase when phrase undefined", () => {
      expect(getUrl(google, undefined, "dog")).toBe(
        "https://www.google.com/search?q=dog",
      );
    });

    it("returns empty query when no phrases", () => {
      expect(getUrl(google)).toBe("https://www.google.com/search?q=");
    });

    it("replaces {{phrase}} with passed phrase", () => {
      expect(getUrl(google, "{{phrase}} wiki", "dog")).toBe(
        "https://www.google.com/search?q=dog wiki",
      );
    });

    it("replaces all {{phrase}} occurrences", () => {
      expect(getUrl(google, "{{phrase}} vs {{phrase}}", "dog")).toBe(
        "https://www.google.com/search?q=dog vs dog",
      );
    });

    it("ignores passed phrase when phrase has no placeholder", () => {
      expect(getUrl(google, "cat", "dog")).toBe(
        "https://www.google.com/search?q=cat",
      );
    });
  });
});
