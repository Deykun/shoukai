import clsx from "clsx";

import useAppStore from "@/stores/appStore";

import OverviewModal from "@/features/documentation/components/OverviewModal";
import HistoryModal from "@/features/history/components/HistoryModal";
import LanguageModal from "@/features/search/components/SearchSettings/Language/LanguageModal";
import RecipesItemModal from "@/features/search/components/SearchSettings/Recipes/RecipesItemModal";

type Props = {
  children: React.ReactNode;
};

const ModalAsContentWrapper = ({ children }: Props) => {
  const isModalOpen = useAppStore((state) => !!state.modal.type);

  return (
    <div className="grid">
      <div className="col-start-1 row-start-1 empty:hidden z-[10]">
        <HistoryModal />
        <LanguageModal />
        <OverviewModal />
        <RecipesItemModal />
      </div>
      <div
        className={clsx("col-start-1 row-start-1", "duration-500", {
          "opacity-100": !isModalOpen,
          "opacity-0 translate-y-6 pointer-events-none": isModalOpen,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalAsContentWrapper;
