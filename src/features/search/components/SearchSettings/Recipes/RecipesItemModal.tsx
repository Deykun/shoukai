import { useTranslation } from "react-i18next";

import { recipeById, SupportedSearchEngine } from "@/constants";
import useAppStore, { closeModal } from "@/stores/appStore";

import IconClose from "@/components/Icons/IconClose";
import IconSend from "@/components/Icons/IconSend";
import IconSearchInput from "@/components/Icons/IconSearchInput";
import IconSearchWeb from "@/components/Icons/IconSearchWeb";
import IconSearchResults from "@/components/Icons/IconSearchResults";

import ButtonIcon from "@/components/UI/ButtonIcon";
import RecipesItemModalField from "./RecipesItemModalField";
import RecipesItemModalHeader from "./RecipesItemModalHeader";
import ButtonText from "@/components/UI/ButtonText";
import { useCallback } from "react";
import useSearchSettingsStore, {
  updateUserRecipe,
} from "@/features/search/stores/searchSettingsStore";
import SearchEnginePicker from "../SearchEnginePicker/SearchEnginePicker";

const RecipesItemModal = () => {
  const modal = useAppStore((state) => state.modal);
  const recipeId = useAppStore((state) =>
    state.modal.type === "recipe" ? state.modal.data.recipeId : ""
  );
  const userRecipe = useSearchSettingsStore((state) =>
    recipeId ? state.recipesById[recipeId] : undefined
  );

  const { t, i18n } = useTranslation();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!recipeId) {
        return;
      }

      const form = event.currentTarget;
      const formData = new FormData(form);

      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      const userRecipe = {
        searchEngine: (data.searchEngine || "") as SupportedSearchEngine,
      };

      updateUserRecipe(recipeId, userRecipe);
      closeModal();
    },
    [recipeId, modal.data]
  );

  if (modal.type !== "recipe" || !userRecipe) {
    return null;
  }

  const recipe = recipeById[modal.data.recipeId];

  const { name, description, byLang } = recipe;

  return (
    <article
      key={modal.data.recipeId}
      className="max-w-screen-md mx-auto p-4 flex flex-col gap-5 animate-fade-in"
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
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 gap-4 items-center external-content">
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
            icon={IconSearchInput}
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
            icon={IconSearchWeb}
            title="2. Searching"
            description="Rules related to the actual search action."
          />
          <RecipesItemModalField
            label="Search phrase"
            value={recipe.searchOptions.default}
            isDisabled
          />
          <RecipesItemModalField label="Search engine">
            <SearchEnginePicker
              className="flex gap-2 items-center"
              name="searchEngine"
              value={userRecipe.searchEngine}
            />
          </RecipesItemModalField>
          <RecipesItemModalHeader
            icon={IconSearchResults}
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
        <div className="flex mt-12 py-3 justify-between items-center sticky bottom-0 bg-body">
          <ButtonText onClick={closeModal} size="large">
            <IconClose />
            <span>{t("main.close")}</span>
          </ButtonText>
          <ButtonText isActive size="large">
            <IconSend />
            <span>Update recipe</span>
          </ButtonText>
        </div>
      </form>
    </article>
  );
};

export default RecipesItemModal;
