import useAppStore, { toggleHistoryModal } from "@/stores/appStore";

import IconHistory from "@/components/Icons/IconHistory";

import ButtonIcon from "@/components/UI/ButtonIcon";

const History = () => {
  const isOpen = useAppStore((state) => state.modal.type === "history");

  return (
    <div className="flex gap-1">
      <h3 className="sr-only">History</h3>
      <ButtonIcon
        onClick={toggleHistoryModal}
        isActive={isOpen}
        label="History"
        labelPosition="bottom"
      >
        <IconHistory />
      </ButtonIcon>
    </div>
  );
};

export default History;
