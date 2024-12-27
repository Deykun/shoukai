import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { SearchResultEvaluated } from "@/types";

type Props = {
  isOpen: boolean;
  result: SearchResultEvaluated;
};

const SearchResultsItemFooter = ({ isOpen, result }: Props) => {
  const { score, source } = result;

  const { t } = useTranslation();

  return (
    <footer
      className={clsx("overflow-hidden duration-300", "text-xs", "flex justify-end gap-5", {
        "mt-2 max-h-10 opacity-100": isOpen,
        "-mt-2 max-h-0 opacity-0": !isOpen,
      })}
    >
      <span>{(100 * (score / 1)).toFixed(1)}%</span>
      <span>
        {t("search.source")}: <span className="text-[#075525]">{source}</span>
      </span>
    </footer>
  );
};

export default SearchResultsItemFooter;
