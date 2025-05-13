import clsx from "clsx";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ShoukaiQuery } from "@/types";
import { closeModal } from "@/stores/appStore";
import { formatToHourMinute } from "@/utils/date";

import { setSearchPhrase } from "@/features/search/stores/searchStore";

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
    <section className="flex flex-col gap-2">
      <h2
        className={clsx(
          "sticky top-0 bg-[#f5f9ef] px-4 py-2 rounded-md",
          "font-[600] flex gap-2 items-center"
        )}
      >
        {stamp}
        <span className="ml-auto text-xs">{items.length}</span>
      </h2>
      {items.map((item) => (
        <div key={item.phrase} className="flex gap-5 items-center px-4">
          <span className="mr-auto text-body-contrast--50 text-xs">
            {formatToHourMinute(item.date)}
          </span>
          <span className="flex items-center gap-1 text-body-contrast--50 text-xs">
            Opened tabs:{" "}
            <strong className="text-[#005b46] text-sm">{item.openedTabs.length}</strong>
          </span>
          <span className="text-body-contrast opacity-20 text-sm">|</span>
          <button
            onClick={() => handleGoToQuery(item.phrase)}
            className="text-sm font-[600] text-[#005b46]"
          >
            “{item.phrase}”
          </button>
        </div>
      ))}
    </section>
  );
};

export default HistoryModalSection;
