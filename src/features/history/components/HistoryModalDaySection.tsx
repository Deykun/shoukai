import { useTranslation } from "react-i18next";

import { ShoukaiQuery } from "@/types";

import { setSearchPhrase } from "@/features/search/stores/searchStore";
import { useCallback } from "react";
import { closeModal } from "@/stores/appStore";

type Props = {
  stamp: string;
  items: ShoukaiQuery[];
};

const HistoryModalSection = ({ stamp, items }: Props) => {
  const { t } = useTranslation();

  const handleGoToQuery = useCallback((searchPhrase: string) => {
    setSearchPhrase(searchPhrase);
    closeModal();
  }, []);

  return (
    <section>
      <h2 className="sticky top-0">
        {stamp} -{" "}
        {t("search.resultsFound", {
          postProcess: "interval",
          count: items.length,
        })}
      </h2>
      {items.map((item) => (
        <div key={item.phrase}>
          <button onClick={() => handleGoToQuery(item.phrase)}>
            “{item.phrase}”
          </button>
          {/* {item.date} */}
        </div>
      ))}
    </section>
  );
};

export default HistoryModalSection;
