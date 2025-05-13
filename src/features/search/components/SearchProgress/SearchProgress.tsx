import { useCallback, useEffect, useState } from "react";

import useSearchStore from "@/features/search/stores/searchStore";

import IconCheck from "@/components/Icons/IconCheck";
import IconLoaderDots from "@/components/Icons/IconLoaderDots";

const SearchProgress = () => {
  const [status, setStatus] = useState({
    tabsCompleted: 0,
    tabsTotal: 0,
  });
  const searchPhrase = useSearchStore((state) => state.searchPhrase);
  const hasResults = useSearchStore((state) => state.results.length > 0);
  const inputTags = useSearchStore((state) => state.meta.input);
  const resultTags = useSearchStore((state) => state.meta.results);

  const handleStorageUpdate = useCallback(() => {
    const shoukaiQuery = window.shoukaiGetQuery
      ? window.shoukaiGetQuery(searchPhrase)
      : undefined;

    const openedTabs = shoukaiQuery?.openedTabs || [];

    if (openedTabs.length > 0) {
      const resultsByKey = window.shoukaiGetResultsByKey
        ? window.shoukaiGetResultsByKey()
        : {};

      const tabsCompleted =
        shoukaiQuery?.searchKeys?.filter((searchKey) => resultsByKey[searchKey])
          .length || 0;

      setStatus({
        tabsCompleted,
        tabsTotal: openedTabs.length,
      });

      return;
    }

    setStatus({
      tabsCompleted: 0,
      tabsTotal: 0,
    });
  }, []);

  useEffect(() => {
    handleStorageUpdate();

    window.addEventListener("storage", handleStorageUpdate);

    return () => window.removeEventListener("storage", handleStorageUpdate);
  }, [handleStorageUpdate, hasResults]);

  if (!searchPhrase) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 bg-[#f5f9ef] mb-5 py-2 p-4 rounded-md">
      <div className="flex items-center">
        <div className="w-full relative bg-[#979f8a] h-2 rounded-full">
          <span
            className="absolute top-0 left-0 h-full bdg-[#075525] bg-black rounded-full duration-300"
            style={{
              width: `${(100 * status.tabsCompleted) / status.tabsTotal}%`,
            }}
          />
        </div>
        {status.tabsTotal > 0 && (
          <span className="flex gap-2 ml-3 min-w-[7ch] items-center justify-end whitespace-nowrap">
            {status.tabsCompleted}{" "}
            <span className="text-xs text-[#979f8a]">/</span> {status.tabsTotal}
            {status.tabsCompleted < status.tabsTotal ? (
              <IconLoaderDots className="shrink-0 size-5 text-black" />
            ) : (
              <IconCheck className="shrink-0 size-5 text-[#005b46]" />
            )}
          </span>
        )}
      </div>
      <p className="text-xs text-[#979f8a] empty:hidden">
        {[...inputTags, ...resultTags].map((tag) => `#${tag}`).join(" ")}
      </p>
    </div>
  );
};

export default SearchProgress;
