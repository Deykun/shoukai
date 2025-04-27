import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { initRecipes } from "@/constants";
import { UserSearchRecipe } from "@/types";

type AppStoreState = {
  Recipes: UserSearchRecipe[],
};

export const useSearchSettingsStore = create<AppStoreState>()(
  persist(
    devtools(
      (_get, _set) => ({
        Recipes: initRecipes,
      }),
      { name: "searchSettingsStore" }
    ),
    { name: "search-settings-store" }
  )
);

export const toggleActiveForRecipe = (id: string) => {
  useSearchSettingsStore.setState((state) => ({
    Recipes: state.Recipes.map((recipe) => ({ ...recipe, isActive: id === recipe.id ? !recipe.isActive : recipe.isActive })),
  }))
}

export default useSearchSettingsStore;
