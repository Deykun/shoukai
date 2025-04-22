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

export default useSearchSettingsStore;
