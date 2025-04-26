import { create } from "zustand";
import { devtools } from "zustand/middleware";

type TopPane = "" | "settings";

type ModalEmpty = {
  type: "";
  data: {};
};

type ModalRecipe = {
  type: "recipe";
  data: {
    recipeKey: string;
  };
};

type Modal = ModalEmpty | ModalRecipe;

// type Modal = ;

type AppStoreState = {
  topPane: TopPane;
  modal: Modal;
};

const MODAL_EMPTY: ModalEmpty = {
  type: "",
  data: {},
};

const INIT_STATE: AppStoreState = {
  topPane: "",
  modal: MODAL_EMPTY,
};

export const useAppStore = create<AppStoreState>()(
  devtools((_get, _set) => INIT_STATE, { name: "appStore" })
);

export const toggleSettingsPane = () => {
  useAppStore.setState((state) => {
    if (state.topPane === "settings") {
      return {
        topPane: '',
        ...MODAL_EMPTY,
      };
    }

    return {
      topPane: "settings",
    };
  });
};

export default useAppStore;
