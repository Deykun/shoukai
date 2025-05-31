import clsx from "clsx";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ShoukaiQuery } from "@/types";
import { closeModal } from "@/stores/appStore";
import { formatToHourMinute } from "@/utils/date";

import { setSearchPhrase } from "@/features/search/stores/searchStore";

import IconErase from "@/components/Icons/IconErase";
import ButtonIcon from "@/components/UI/ButtonIcon";

type Props = {
  stamp: string;
  items: ShoukaiQuery[];
  refreshMap?: () => void,
};

const HistoryModalSection = ({ stamp, items, refreshMap }: Props) => {
  const handleGoToQuery = useCallback((searchPhrase: string) => {
    setSearchPhrase(searchPhrase);
    closeModal();
  }, []);

  const handleRemove = useCallback(
    ({ stamp, item }: { stamp: string; item: ShoukaiQuery }) => {
      console.log({ stamp, phrase: item.phrase });
      console.log(window.shoukaiRemoveHistoryItem);
      if (window.shoukaiRemoveHistoryItem) {
        window.shoukaiRemoveHistoryItem({ stamp, phrase: item.phrase });
      }

      if (refreshMap) {
        refreshMap();
      }
    },
    [refreshMap]
  );

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
          <span>
            <ButtonIcon
              onClick={() => handleRemove({ stamp, item })}
              label="Remove"
              labelPosition="bottom"
              size="small"
            >
              <IconErase />
            </ButtonIcon>
          </span>
          <span className="mr-auto text-body-contrast--50 text-xs">
            {formatToHourMinute(item.date)}
          </span>
          <span className="flex items-center gap-1 text-body-contrast--50 text-xs">
            Opened tabs:{" "}
            <strong className="text-[#005b46] text-sm">
              {item.openedTabs.length}
            </strong>
          </span>
          <span className="text-body-contrast opacity-20 text-sm">|</span>
          <span>
            “
            <button
              onClick={() => handleGoToQuery(item.phrase)}
              className="text-sm font-[600] text-[#005b46] max-w-[300px] truncate text-ellipsis"
            >
              {item.phrase}
            </button>
            ”
          </span>
        </div>
      ))}
    </section>
  );
};

export default HistoryModalSection;
