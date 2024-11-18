import clsx from "clsx";

import useSearchStore from "@/features/search/stores/searchStore";

import SearchBar from "@/features/search/components/SearchBar";
import SearchResultsSummary from "@/features/search/components/SearchResultsSummary";
import SidebarWikipedia from "@/features/wikipedia/components/SidebarWikipedia";

const SearchPage = () => {
  const results = useSearchStore((state) => state.searchPhrase);

  return (
    <div
      className={clsx("max-w-screen-xl mx-auto p-4 duration-300", {
        "mt-[200px]": results.length === 0,
      })}
    >
      <h1 className="text-[50px] mb-10 font-[600] tracking-wide text-center text-primary-contrast">
        spes
      </h1>
      <SearchBar />
      <main className="mt-10 flex flex-row gap-5">
        <div className="w-full">
          <SearchResultsSummary />
          {/* Results */}
        </div>
        <aside className="w-[300px]">
          <SidebarWikipedia />
        </aside>
      </main>
    </div>
  );
};

export default SearchPage;
