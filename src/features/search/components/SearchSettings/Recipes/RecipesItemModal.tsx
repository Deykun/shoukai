import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { recipeById, supportedSearchEngines } from "@/constants";
import useAppStore, { closeModal } from "@/stores/appStore";

import IconClose from "@/components/Icons/IconClose";
import IconLogo from "@/components/Icons/IconLogo";
import IconSearchResults from "@/components/Icons/IconSearchResults";
import IconSend from "@/components/Icons/IconSend";

import ButtonIcon from "@/components/UI/ButtonIcon";
import RecipesItemModalField from "./RecipesItemModalField";
import RecipesItemModalHeader from "./RecipesItemModalHeader";
import ButtonText from "@/components/UI/ButtonText";

const RecipesItemModal = () => {
  const modal = useAppStore((state) => state.modal);
  const { t, i18n } = useTranslation();

  if (modal.type !== "recipe") {
    return null;
  }

  const recipe = recipeById[modal.data.recipeId];

  const { name, description, byLang } = recipe;

  return (
    <article
      key={modal.data.recipeId}
      className={clsx(
        "max-w-screen-md mx-auto p-4 flex flex-col gap-5 animate-fade-in"
      )}
    >
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
      <form>
        <div className="grid grid-cols-4 gap-4 items-center">
          <RecipesItemModalHeader
            title="Recipe"
            description="Metadata used by Shoukai."
          />
          <RecipesItemModalField
            label="Id"
            value={modal.data.recipeId}
            isDisabled
          />
          <RecipesItemModalField
            label="Name"
            value={byLang?.[i18n.language]?.name || name}
            isDisabled
          />
          <RecipesItemModalField
            label="Description"
            value={byLang?.[i18n.language]?.description || description}
            isDisabled
          />
          <RecipesItemModalHeader
            title="1. Before searching"
            description="Rules that determine whether a recipe will be called. For instance, if phrases related to programming are identified, there's no need to call a recipe associated with movies."
          />
          <RecipesItemModalField
            label="Promote for tags"
            value={recipe.promoteForTags.join(", ")}
            isDisabled
          />
          <RecipesItemModalField
            label="Skip for tags"
            value={recipe.skipForTags.join(", ")}
            isDisabled
          />
          <RecipesItemModalHeader
            title="2. Searching"
            description="Rules related to the actual search action."
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
          <RecipesItemModalHeader
            title="3. After searching"
            description="Rules concerning result scoring and validation."
          />
          <RecipesItemModalField
            label="Words to ignore"
            value={(recipe.wordsToIgnore || []).join(", ")}
            valueDescription={`Those words will be excluded from the title during scoring, like "BBC News" on bbc.com.`}
            isDisabled
          />
          <RecipesItemModalField
            label="Minimum score"
            value={`${recipe.minimumScore}`}
            isDisabled
          />
        </div>
        <div className="flex mt-10 justify-end">
          <ButtonText isActive size="large" isDisabled>
            <IconSend />
            <span>Update recipe</span>
          </ButtonText>
        </div>
      </form>
    </article>
  );
};

export default RecipesItemModal;
