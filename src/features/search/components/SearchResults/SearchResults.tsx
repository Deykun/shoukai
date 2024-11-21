import useSearchStore from '@/features/search/stores/searchStore';

import SearchResultsItem from './SearchResultsItem';

const SearchResults = () => {
  const results = useSearchStore(state => state.results);

  // TODO: replace
  if (!results.length) {
    return <p>
      <button onClick={window.spesRenderSearch || undefined}>Retry</button>
    </p>;
  }

  return (
    <ul className="flex flex-col gap-5">
      {results.map(result => <SearchResultsItem key={result.url} result={result} />)}
    </ul>
  )
}

export default SearchResults;
