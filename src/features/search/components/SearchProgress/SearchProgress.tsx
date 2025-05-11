import useSearchStore from "@/features/search/stores/searchStore";
import { useCallback, useEffect } from "react";

const SearchProgress = () => {
  const searchPhrase = useSearchStore((state) => state.searchPhrase);
  const hasResults = useSearchStore((state) => state.results.length > 0);
    const inputTags = useSearchStore((state) => state.meta.input);
    const resultTags = useSearchStore((state) => state.meta.results);

  const handleStorageUpdate = useCallback((event: StorageEvent) => {
    if (event) {
      console.log("Bump");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", handleStorageUpdate);

    return () => window.removeEventListener("storage", handleStorageUpdate);
  }, [handleStorageUpdate]);

  return (
    <div>
      <strong>{searchPhrase}</strong>
      {inputTags.join(', ')}
      {resultTags.join(', ')}

      {hasResults ? "Ma wyniki" : "Nie ma"}
    </div>
  );
};

export default SearchProgress;
