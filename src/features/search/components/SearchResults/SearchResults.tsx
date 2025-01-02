import useSearchStore from '@/features/search/stores/searchStore';

import useSearch from '@/features/search/hooks/useSearch';

import Map from "@/features/map/components/Map";
import SearchResultsItem from './SearchResultsItem';

const SearchResults = () => {
  const results = useSearchStore(state => state.results);

  useSearch();

  if (!results.length) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-5">
      {results.slice(0, 1).map(result => <SearchResultsItem key={result.url} result={result} />)}
      <Map />
      {results.slice(1).map(result => <SearchResultsItem key={result.url} result={result} />)}
    </ul>
  )
}

export default SearchResults;
