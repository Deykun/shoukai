import clsx from "clsx";
import { useTranslation } from "react-i18next";

import useAppStore, { closeModal } from "@/stores/appStore";

import IconClose from "@/components/Icons/IconClose";

import ButtonIcon from "@/components/UI/ButtonIcon";

const RecipesItemModal = () => {
  const modal = useAppStore((state) => state.modal);
  const { t } = useTranslation();

  console.log("modal", modal);

  if (modal.type !== "recipe") {
    return null;
  }

  return (
    <div
      className={clsx(
        "max-w-screen-md mx-auto p-4 flex flex-col gap-5 animate-fade-in"
      )}
    >
      <div className="flex gap-5 items-center">
        <h2>Recipe <strong>"{modal.data.recipeId}"</strong></h2>
        <ButtonIcon
          wrapperClassName="ml-auto"
          label={t("main.close")}
          labelPosition="bottom"
          onClick={closeModal}
        >
          <IconClose />
        </ButtonIcon>
        {/* </div> */}
      </div>
    </div>
  );
};

export default RecipesItemModal;
