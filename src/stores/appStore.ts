import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

type PaneType = '' | 'preferences';

type AppStoreState = {
  pane: PaneType,
}

export const useAppStore = create<AppStoreState>()(
  devtools(
    () => ({
      pane: '',
    } as AppStoreState),
    { name: 'appStore' },
  )
);

export const setPane = (pane: PaneType = '') => {
  useAppStore.setState((state) => ({
    ...state,
    pane,
  }));
}

export default useAppStore;
