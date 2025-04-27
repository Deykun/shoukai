import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { initRecipes, recipeById } from "@/constants";
import { SearchRecipe, UserSearchRecipe } from "@/types";

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

export const selectUserRecipes = (state: AppStoreState): SearchRecipe[] => {
  const activeUserRecipes = Object.values(state.recipesById).filter(
    ({ isActive }) => isActive
  );

  const recipes = activeUserRecipes.reduce(
    (stack: SearchRecipe[], userRecipe) => {
      stack.push(recipeById[userRecipe.id]);

      return stack;
    },
    []
  );

  return recipes;
};

export default useSearchSettingsStore;
