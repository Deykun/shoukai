import { useTranslation } from "react-i18next";

import useAppStore, { closeModal } from "@/stores/appStore";

import IconClose from "@/components/Icons/IconClose";

import ButtonIcon from "@/components/UI/ButtonIcon";
import { useMemo } from "react";
import { getDayStampFromDate } from "../utils/date";
import { ShoukaiQuery } from "@/types";
import HistoryModalSection from "./HistoryModalDaySection";

const HistoryModal = () => {
  const isOpen = useAppStore((state) => state.modal.type === "history");

  const { t } = useTranslation();

  const queriesAsMap = useMemo(() => {
    if (!window?.shoukaiGetQueries || !isOpen) {
      return [];
    }

    const queries = window.shoukaiGetQueries();

    const queriesByDay = Object.values(queries).reduce(
      (
        stack: {
          [stamp: string]: ShoukaiQuery[];
        },
        item
      ) => {
        const { stamp } = getDayStampFromDate(item.date);

        if (stack[stamp]) {
          stack[stamp].push(item);
        } else {
          stack[stamp] = [item];
        }

        return stack;
      },
      {}
    );

    const queriesAsMap = Object.entries(queriesByDay).map(
      ([stamp, items]) => {
        return {
          stamp,
          items,
        };
      },
      []
    );

    return queriesAsMap;
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="max-w-screen-md mx-auto p-4 flex flex-col gap-5 animate-fade-in">
      <header className="flex gap-5 items-center">
        <ButtonIcon
          wrapperClassName="ml-auto"
          label={t("main.close")}
          labelPosition="bottom"
          onClick={closeModal}
        >
          <IconClose />
        </ButtonIcon>
      </header>
      {[
        ...queriesAsMap,
        ...queriesAsMap,
        ...queriesAsMap,
        ...queriesAsMap,
        ...queriesAsMap,
        ...queriesAsMap,
      ].map(({ stamp, items }) => (
        <HistoryModalSection stamp={stamp} items={items} />
      ))}
    </div>
  );
};

export default HistoryModal;
