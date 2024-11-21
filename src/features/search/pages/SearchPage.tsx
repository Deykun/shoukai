import clsx from "clsx";

import IconSearch from '@/components/Icons/IconSearch';

import useSearchStore from "@/features/search/stores/searchStore";

import PreferencesSidebar from "@/features/preferences/components/PreferencesSidebar";
import SearchBar from "@/features/search/components/SearchBar";
import SearchResultsSummary from "@/features/search/components/SearchResultsSummary";
import SearchResults from "@/features/search/components/SearchResults/SearchResults";
import GoToSearchEngine from "@/features/search/components/GoToSearchEngine";
import SidebarWikipedia from "@/features/wikipedia/components/SidebarWikipedia";

const SearchPage = () => {
  const results = useSearchStore((state) => state.searchPhrase);

  return (
    <div
      className={clsx("max-w-screen-md mx-auto p-4 duration-300", {
        "mt-[200px]": results.length === 0,
        "mt-[50px]": results.length > 1,
      })}
    >
      <PreferencesSidebar />
      <h1 className={clsx(
        'flex flex-row justify-center items-center gap-3 mb-10',
        'text-[50px] font-[600] text-center text-primary-contrast'
      )}>
        <span>spes</span>
        <IconSearch className="size-12 fill-[#82a849]"/>
      </h1>
      <SearchBar />
      <main className="mt-10">      
        <SearchResultsSummary />
        <div className="mt-5 grid grid-cols-3 gap-5">  
          <div className="col-span-2">
            <SearchResults />
          </div>
          <aside className="flex flex-col gap-5">
            <SidebarWikipedia />
            <GoToSearchEngine />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
