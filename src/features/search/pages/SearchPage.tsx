import clsx from "clsx";

import IconSearch from '@/components/Icons/IconSearch';

import useSearchStore from "@/features/search/stores/searchStore";

import SearchBar from "@/features/search/components/SearchBar";
import SearchResultsSummary from "@/features/search/components/SearchResultsSummary";
import GoToSearchEngine from "@/features/search/components/GoToSearchEngine";
import SidebarWikipedia from "@/features/wikipedia/components/SidebarWikipedia";

const SearchPage = () => {
  const results = useSearchStore((state) => state.searchPhrase);

  return (
    <div
      className={clsx("max-w-screen-xl mx-auto p-4 duration-300", {
        "mt-[200px]": results.length === 0,
      })}
    >
      <h1 className={clsx(
        'flex flex-row justify-center items-center gap-3 mb-10',
        'text-[50px] font-[600] tracking-wide text-center text-primary-contrast'
      )}>
        <span>spes</span>
        <IconSearch className="size-12 fill-[#82a849]"/>
      </h1>
      <SearchBar />
      <main className="mt-10 flex flex-row gap-5">
        <div className="w-full">
          <SearchResultsSummary />
          {/* Results */}
        </div>
        <aside className="flex flex-col gap-4 w-[400px]">
          <GoToSearchEngine />
          <SidebarWikipedia />
        </aside>
      </main>
    </div>
  );
};

export default SearchPage;
