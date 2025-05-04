import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import useAppStore, { closeModal } from "@/stores/appStore";

import IconClose from "@/components/Icons/IconClose";
import IconErase from "@/components/Icons/IconErase";

import ButtonIcon from "@/components/UI/ButtonIcon";
import HistoryModalSection from "./HistoryModalSection";
import ButtonText from "@/components/UI/ButtonText";

const HistoryModal = () => {
  const isOpen = useAppStore((state) => state.modal.type === "history");

  const { t } = useTranslation();

  const handleClear = useCallback(() => {
    if (window.shoukaiReset) {
      window.shoukaiReset();
    }

    closeModal();
  }, []);

  const queriesAsMap = useMemo(() => {
    if (!window?.shoukaiGetQueries || !isOpen) {
      return [];
    }

    const queriesByDay = window?.shoukaiGetQueries() || {};

    const queriesAsMap = Object.entries(queriesByDay).map(
      ([stamp, queries]) => {
        return {
          stamp,
          items: Object.values(queries).sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          ),
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
        <ButtonText
          onClick={handleClear}
          isDisabled={queriesAsMap.length === 0}
        >
          <IconErase />
          <span>Remove</span>
        </ButtonText>
        <ButtonIcon
          wrapperClassName="ml-auto"
          label={t("main.close")}
          labelPosition="bottom"
          onClick={closeModal}
        >
          <IconClose />
        </ButtonIcon>
      </header>
      <div className="external-content">
        <h1>History</h1>
      </div>
      {queriesAsMap.map(({ stamp, items }) => (
        <HistoryModalSection stamp={stamp} items={items} />
      ))}
    </div>
  );
};

export default HistoryModal;
