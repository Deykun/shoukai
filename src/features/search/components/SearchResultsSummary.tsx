import { useTranslation } from "react-i18next";

import useSearchStore from "@/features/search/stores/searchStore";

const SearchResultsSummary = () => {
  const { t } = useTranslation();

  const searchPhrase = useSearchStore((state) => state.searchPhrase);
  const results = useSearchStore((state) => state.results);

  if (!searchPhrase) {
    return null;
  }

  return (
    <p className="flex text-sm">
      “{" "}
      <span className="tracking-wider font-[600] text-black max-w-[300px] truncate text-ellipsis">
        {searchPhrase}
      </span>{" "}
      ” -{" "}
      {t("search.resultsFound", {
        postProcess: "interval",
        count: results.length,
      })}
    </p>
  );
};

export default SearchResultsSummary;
