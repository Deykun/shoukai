import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { initRecipes, recipeById } from "@/constants";
import { ShoukaiSearchRecipe, UserSearchRecipe } from "@/types";
import {
  SupportedShoukaiSearchEngineText,
  SupportedShoukaiSearchEngineTextParsers,
} from "@/types/supported/text-engines";
import { SupportedSearchEngineImage } from "@/types/supported/image-engines";
import { SupportedShoukaiSearchEngineMap } from "@/types/supported/map-engines";
import { SupportedShoukaiChatbot } from "@/types/supported/chatbots";

type AppStoreState = {
  shouldOpenNewTabForResults: boolean;
  defaultEngines: {
    text: SupportedShoukaiSearchEngineText;
    textParser: SupportedShoukaiSearchEngineTextParsers;
    image: SupportedSearchEngineImage;
    map: SupportedShoukaiSearchEngineMap;
    chatbot: SupportedShoukaiChatbot;
  };
  recipesById: {
    [id: string]: UserSearchRecipe;
  };
};

export const useSearchSettingsStore = create<AppStoreState>()(
  persist(
    devtools(
      (_get, _set) => ({
        shouldOpenNewTabForResults: false,
        defaultEngines: {
          text: "google",
          textParser: "google",
          image: "google",
          map: "google",
          chatbot: "chatgpt",
        },
        recipesById: initRecipes,
      }),
      { name: "searchSettingsStore" },
    ),
    { name: "search-settings-store" },
  ),
);

export const setDefaultSearch = (
  type: keyof AppStoreState["defaultEngines"],
  value: string,
) => {
  useSearchSettingsStore.setState((state) => ({
    ...state,
    defaultEngines: {
      ...state.defaultEngines,
      [type]: value,
    },
  }));
};

export const toggleShouldOpenNewTabForResult = () => {
  useSearchSettingsStore.setState((state) => ({
    shouldOpenNewTabForResults: !state.shouldOpenNewTabForResults,
  }));
};

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
  userRecipeUpdate: Partial<UserSearchRecipe>,
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

export const selectUserRecipes = (
  state: AppStoreState,
): ShoukaiSearchRecipe[] => {
  const activeUserRecipes = Object.values(state.recipesById).filter(
    ({ isActive }) => isActive,
  );

  const recipes = activeUserRecipes.reduce(
    (stack: ShoukaiSearchRecipe[], userRecipe) => {
      stack.push({
        ...recipeById[userRecipe.id],
        ...userRecipe,
      });

      return stack;
    },
    [],
  );

  return recipes;
};

export default useSearchSettingsStore;
