import useSearchStore from "@/features/search/stores/searchStore";

import useSearch from "@/features/search/hooks/useSearch";

import Map from "@/features/map/components/Map";
import SearchResultsItem from "./SearchResultsItem";

const SearchResults = () => {
  const results = useSearchStore((state) => state.results);

  useSearch();

  return (
    <ul className="flex flex-col gap-5">
      <Map />
      {results.length > 0 && (
        <>
          {results.map((result) => (
            <SearchResultsItem key={result.url} result={result} />
          ))}
        </>
      )}
    </ul>
  );
};

export default SearchResults;
