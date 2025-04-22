import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AppStoreState = {
  areSettingsOpen: boolean;
};

export const useAppStore = create<AppStoreState>()(
  devtools(
    (_get, _set) => ({
      areSettingsOpen: false,
    }),
    { name: "appStore" }
  )
);

export const toggleSettings = () => {
  useAppStore.setState((state) => ({
    areSettingsOpen: !state.areSettingsOpen,
  }));
};

export default useAppStore;
