import { useTranslation } from "react-i18next";
import { UserSearchRecipe } from "@/types";
import { recipeById } from "@/constants";

import useAppStore, { toggleRecipeModal } from "@/stores/appStore";
import { toggleActiveForRecipe } from "@/features/search/stores/searchSettingsStore";

import IconEyeCheck from "@/components/Icons/IconEyeCheck";
import IconEyePause from "@/components/Icons/IconEyePause";
import ButtonIcon from "@/components/UI/ButtonIcon";
import IconSearchSettings from "@/components/Icons/IconSearchSettings";

type Props = {
  userRecipe: UserSearchRecipe;
};

const RecipesItem = ({ userRecipe }: Props) => {
  const isModalOpen = useAppStore(
    (state) =>
      state.modal.type === "recipe" &&
      state.modal.data.recipeId === userRecipe.id
  );
  const { t, i18n } = useTranslation();

  const { id, isActive } = userRecipe;

  const recipe = recipeById[id];

  if (!recipe) {
    return null;
  }

  const { name, description, svgIcon, byLang } = recipe;

  return (
    <li className="flex flex-col gap-2">
      <header className="flex gap-3 items-center">
        {svgIcon && (
          <span
            className="[&>svg]:size-7 text-[#075525] inline-flex items-center"
            dangerouslySetInnerHTML={{ __html: svgIcon }}
          />
        )}
        <div className="flex flex-col gap-1 font-[600]">
          <h4 className="text-[#005b46]">{byLang?.[i18n.language]?.name || name}</h4>
          <p className="text-xs text-[#979f8a]">
            {byLang?.[i18n.language]?.description || description}
          </p>
        </div>
      </header>
      <div className="flex gap-2 items-center justify-end">
        <ButtonIcon
          onClick={() => toggleActiveForRecipe(id)}
          label={isActive ? "Active" : "Inactive"}
          labelPosition="top"
          isActive={isActive}
        >
          {isActive ? <IconEyeCheck /> : <IconEyePause />}
        </ButtonIcon>
        <ButtonIcon
          onClick={() => toggleRecipeModal(id)}
          label={t("search.settings")}
          labelPosition="top"
          isActive={isModalOpen}
        >
          <IconSearchSettings />
        </ButtonIcon>
      </div>
    </li>
  );
};

export default RecipesItem;
