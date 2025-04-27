import clsx from "clsx";

import useAppStore from "@/stores/appStore";

import RecipesItemModal from "@/features/search/components/SearchSettings/Recipes/RecipesItemModal";

type Props = {
  children: React.ReactNode;
};

const ModalAsContentWrapper = ({ children }: Props) => {
  const isModalOpen = useAppStore((state) => !!state.modal.type);

  return (
    <div className="grid">
      <div className="col-start-1 row-start-1 empty:hidden z-[10]">
        <RecipesItemModal />
      </div>
      <div
        className={clsx("col-start-1 row-start-1", "duration-500", {
          "opacity-100": !isModalOpen,
          "opacity-0 pointer-events-none": isModalOpen,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalAsContentWrapper;
