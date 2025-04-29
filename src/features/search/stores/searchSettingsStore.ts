import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { initRecipes, recipeById } from "@/constants";
import { SearchRecipe, ShoukaiSearchRecipe, UserSearchRecipe } from "@/types";

type AppStoreState = {
  recipesById: {
    [id: string]: UserSearchRecipe;
  };
};

export const useSearchSettingsStore = create<AppStoreState>()(
  persist(
    devtools(
      (_get, _set) => ({
        recipesById: initRecipes,
      }),
      { name: "searchSettingsStore" }
    ),
    { name: "search-settings-store" }
  )
);

export const toggleActiveForRecipe = (id: string) => {
  useSearchSettingsStore.setState((state) => ({
    recipesById: {
      ...state.recipesById,
      [id]: {
        ...state.recipesById[id],
        isActive: !state.recipesById[id].isActive,
      },
    },
  }));
};

export const updateUserRecipe = (
  id: string,
  userRecipeUpdate: Partial<UserSearchRecipe>
) => {
  useSearchSettingsStore.setState((state) => ({
    recipesById: {
      ...state.recipesById,
      [id]: {
        ...state.recipesById[id],
        ...userRecipeUpdate,
      },
    },
  }));
};

export const selectUserRecipes = (state: AppStoreState): ShoukaiSearchRecipe[] => {
  const activeUserRecipes = Object.values(state.recipesById).filter(
    ({ isActive }) => isActive
  );

  const recipes = activeUserRecipes.reduce(
    (stack: ShoukaiSearchRecipe[], userRecipe) => {
      stack.push({
        ...recipeById[userRecipe.id],
        ...userRecipe,
      });

      return stack;
    },
    []
  );

  return recipes;
};

export default useSearchSettingsStore;
