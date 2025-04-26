import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { initRecepies } from "@/constants";
import { UserSearchRecipie } from "@/types";

type AppStoreState = {
  recipies: UserSearchRecipie[],
};

export const useSearchSettingsStore = create<AppStoreState>()(
  persist(
    devtools(
      (_get, _set) => ({
        recipies: initRecepies,
      }),
      { name: "searchSettingsStore" }
    ),
    { name: "search-settings-store" }
  )
);

export const toggleActiveForRecipie = (id: string) => {
  useSearchSettingsStore.setState((state) => ({
    recipies: state.recipies.map((recipe) => ({ ...recipe, isActive: id === recipe.id ? !recipe.isActive : recipe.isActive })),
  }))
}

export default useSearchSettingsStore;
