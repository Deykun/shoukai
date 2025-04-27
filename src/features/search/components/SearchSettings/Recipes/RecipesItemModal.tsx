import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { recipeById, supportedSearchEngines } from "@/constants";
import useAppStore, { closeModal } from "@/stores/appStore";

import IconClose from "@/components/Icons/IconClose";
import IconLogo from "@/components/Icons/IconLogo";
import IconSearchResults from "@/components/Icons/IconSearchResults";

import ButtonIcon from "@/components/UI/ButtonIcon";
import RecipesItemModalField from "./RecipesItemModalField";

const RecipesItemModal = () => {
  const modal = useAppStore((state) => state.modal);
  const { t, i18n } = useTranslation();

  // searchEngine

  console.log("modal", modal);

  if (modal.type !== "recipe") {
    return null;
  }

  const recipe = recipeById[modal.data.recipeId];

  const { name, description, svgIcon, byLang } = recipe;

  console.log(recipe);

  return (
    <article
      key={modal.data.recipeId}
      className={clsx(
        "max-w-screen-md mx-auto p-4 flex flex-col gap-5 animate-fade-in"
      )}
    >
      <header className="flex gap-5 items-center">
        <h1>
          Recipe <strong>"{byLang?.[i18n.language]?.name || name}"</strong>
        </h1>
        <ButtonIcon
          wrapperClassName="ml-auto"
          label={t("main.close")}
          labelPosition="bottom"
          onClick={closeModal}
        >
          <IconClose />
        </ButtonIcon>
      </header>
      <form className="grid grid-cols-4 gap-4 items-center">
        <RecipesItemModalField
          label="Recipe name"
          value={byLang?.[i18n.language]?.name || name}
          isDisabled
        />
        <RecipesItemModalField
          label="Search phrase"
          value={recipe.searchOptions.default}
          isDisabled
        />
        <RecipesItemModalField label="Search engine">
          <div className="flex gap-2 items-center">
            <ButtonIcon
              size="large"
              onClick={() => {}}
              label={t("search.defaultSearch")}
              labelPosition="bottom"
              isDisabled
            >
              <IconSearchResults />
            </ButtonIcon>
            {supportedSearchEngines.map((searchEngine) => (
              <ButtonIcon
                size="large"
                onClick={() => {}}
                label={t(`search.${searchEngine}`)}
                labelPosition="bottom"
                isDisabled
              >
                <IconLogo id={searchEngine} />
              </ButtonIcon>
            ))}
          </div>
        </RecipesItemModalField>
      </form>
    </article>
  );
};

export default RecipesItemModal;
