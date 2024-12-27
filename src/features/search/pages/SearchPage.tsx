import clsx from "clsx";

import Logo from "@/components/Logo/Logo";

import useSearchStore from "@/features/search/stores/searchStore";

import SearchBar from "@/features/search/components/SearchBar";
import SearchResultsSummary from "@/features/search/components/SearchResultsSummary";
import SearchNoText from "@/features/search/components/SearchNoText/SearchNoText";
import SearchLogic from "@/features/search/components/SearchLogic/SearchLogic";
import SearchResults from "@/features/search/components/SearchResults/SearchResults";
import GoToSearchEngine from "@/features/search/components/GoToSearchEngine";
import SearchSettings from "@/features/search/components/SearchSettings/SearchSettings";
import SidebarWikipedia from "@/features/wikipedia/components/SidebarWikipedia";
import { useEffect } from "react";

const SearchPage = () => {
  const searchPhrase = useSearchStore((state) => state.searchPhrase);

  useEffect(() => {
    const defaultTitle = 'shoukai - personalized search';

    if (searchPhrase) {
      document.title = `“${searchPhrase}” - ${defaultTitle}`
    } else {
      document.title = defaultTitle;
    }
  }, [searchPhrase])

  return (
    <>
      <SearchSettings />
      <div
        className={clsx("max-w-screen-md mx-auto p-4 duration-300 ease-in-out", {
          "mt-[200px]": searchPhrase.length === 0,
          "mt-[50px]": searchPhrase.length > 1,
        })}
      >
        <Logo />
        <SearchBar />
        <main className="mt-10">
          <div className="flex justify-between items-center">
            <SearchResultsSummary />
            <SearchNoText />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-5">
            <div className="col-span-2">
              <SearchResults />
              <SearchLogic />
            </div>
            <aside className="flex flex-col gap-5">
              <SidebarWikipedia />
              <GoToSearchEngine />
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

export default SearchPage;
