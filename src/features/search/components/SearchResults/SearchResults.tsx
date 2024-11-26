import useSearchStore from '@/features/search/stores/searchStore';

import useSearch from '@/features/search/hooks/useSearch';

import SearchResultsItem from './SearchResultsItem';

const SearchResults = () => {
  const results = useSearchStore(state => state.results);

  useSearch();

  if (!results.length) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-5">
      {results.map(result => <SearchResultsItem key={result.url} result={result} />)}
    </ul>
  )
}

export default SearchResults;
