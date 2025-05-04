import { create } from "zustand";
import { devtools } from "zustand/middleware";

type TopPane = "" | "settings";

type ModalWithoutState = {
  type: "" | "language" | "documentationOverview" | "history";
  data: {};
};

type ModalRecipe = {
  type: "recipe";
  data: {
    recipeId: string;
  };
};

type Modal = ModalWithoutState | ModalRecipe;

type AppStoreState = {
  topPane: TopPane;
  modal: Modal;
};

const MODAL_EMPTY: ModalWithoutState = {
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
        topPane: "",
        modal: MODAL_EMPTY,
      };
    }

    return {
      topPane: "settings",
    };
  });
};

export const closeModal = () => {
  useAppStore.setState(() => {
    return {
      modal: MODAL_EMPTY,
    };
  });
};

export const toggleModalWithoutState = (
  modal: "language" | "documentationOverview" | "history"
) => {
  useAppStore.setState((state) => {
    const isOpenAlready = state.modal.type === modal;

    if (isOpenAlready) {
      return {
        modal: MODAL_EMPTY,
      };
    }

    return {
      modal: {
        type: modal,
        data: {},
      },
    };
  });
};

export const toggleHistoryModal = () => toggleModalWithoutState("history");

export const toggleLanguageModal = () => toggleModalWithoutState("language");

export const toggleDocumentationOverviewModal = () =>
  toggleModalWithoutState("documentationOverview");

export const toggleRecipeModal = (recipeId: string) => {
  useAppStore.setState((state) => {
    const isOpenAlready =
      state.modal.type === "recipe" && state.modal.data.recipeId === recipeId;

    if (isOpenAlready) {
      return {
        modal: MODAL_EMPTY,
      };
    }

    return {
      modal: {
        type: "recipe",
        data: {
          recipeId,
        },
      },
    };
  });
};

export default useAppStore;
