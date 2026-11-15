import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { recipe as moviesProgramming } from "@/recipes/movies";
import { recipe as programmingRecipe } from "@/recipes/programming";
import { SearchRecipe, ShoukaiSearchRecipe, UserSearchRecipe } from "@/types";
import { SupportedShoukaiSearchEngineTextParsers } from "@/types/supported/text-engines";
import {
  SearchEngineToOpen,
  SearchEngineToOpenType,
} from "@/features/logic-runner/parsers/openers/types";

export type DefaultSearchEngines = {
  [Type in SearchEngineToOpenType]: Exclude<
    Extract<SearchEngineToOpen, { type: Type }>["searchEngine"],
    "defaultSearch"
  >;
};

export const recipeById: {
  [id: string]: SearchRecipe;
} = {
  movies: {
    ...moviesProgramming,
    id: "movies",
  },
  programming: {
    ...programmingRecipe,
    id: "programming",
  },
};

export const initRecipes = Object.values(recipeById).reduce(
  (
    stack: {
      [id: string]: UserSearchRecipe;
    },
    { id },
  ) => {
    stack[id] = { id, isActive: true };

    return stack;
  },
  {},
);

type AppStoreState = {
  shouldOpenNewTabForResults: boolean;
  defaultEngines: DefaultSearchEngines;
  defaultTextParser: SupportedShoukaiSearchEngineTextParsers;
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
          "search-text": "google",
          "search-image": "google",
          "search-location": "google",
          "ask-chatbot": "chatgpt",
        },
        defaultTextParser: "google",
        recipesById: initRecipes,
      }),
      { name: "searchSettingsStore" },
    ),
    {
      name: "search-settings-store",
      version: 1,
      migrate: (persisted, version) => {
        const state = persisted as Record<string, unknown>;

        if (version < 1) {
          const old = (state.defaultEngines ?? {}) as Record<string, string>;

          return {
            ...state,
            defaultEngines: {
              "search-text": old.text ?? "google",
              "search-image": old.image ?? "google",
              "search-location": old.map ?? "google",
              "ask-chatbot": old.chatbot ?? "chatgpt",
            },
            defaultTextParser: old.textParser ?? "google",
          } as AppStoreState;
        }

        return state as AppStoreState;
      },
    },
  ),
);

export const setDefaultSearch = <Type extends SearchEngineToOpenType>(
  type: Type,
  value: DefaultSearchEngines[Type],
) => {
  useSearchSettingsStore.setState((state) => ({
    defaultEngines: {
      ...state.defaultEngines,
      [type]: value,
    },
  }));
};

export const setDefaultTextParser = (
  value: SupportedShoukaiSearchEngineTextParsers,
) => {
  useSearchSettingsStore.setState({ defaultTextParser: value });
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
