import useSearchStore from "@/features/search/stores/searchStore";

const SearchResults = () => {
  const searchPhrase = useSearchStore((state) => state.searchPhrase);
  const results = useSearchStore((state) => state.results);

  if (!searchPhrase || results.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 text-sm">
      <h3>Shoukain search logic of "{searchPhrase}"</h3>
      <strong>[todo]</strong>
      <p>Choosing the best recipes for the phrase</p>
      <p>Fetching the best matches</p>
      <p>If the best match is good, returning the result</p>
      <p>If the best match is bad, trying something else</p>
    </section>
  );
};

export default SearchResults;
