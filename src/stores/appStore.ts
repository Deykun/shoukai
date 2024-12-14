import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

type AppStoreState = {
  areSettingsOpen: boolean,
}

export const useAppStore = create<AppStoreState>()(
  devtools(
    () => ({
      areSettingsOpen: false,
    } as AppStoreState),
    { name: 'appStore' },
  )
);

export const toggleSettings = () => {
  useAppStore.setState((state) => ({
    ...state,
    areSettingsOpen: !state.areSettingsOpen,
  }));
};

export default useAppStore;
