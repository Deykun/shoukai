import { create } from "zustand";

import { noop } from "lodash";

export const CONFIRM_STATE = {
  IDLE: "idle",
  ACTIVE: "active",
} as const;

export type ConfirmState = (typeof CONFIRM_STATE)[keyof typeof CONFIRM_STATE];

export type ConfirmStoreState = {
  state: ConfirmState;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  content: string;
};

const emptyConfirmStore: ConfirmStoreState = {
  state: CONFIRM_STATE.IDLE,
  onConfirm: noop,
  onCancel: noop,
  title: "",
  content: "",
};

const useConfirmStore = create<ConfirmStoreState>(() => ({
  ...emptyConfirmStore,
}));

export const openConfirm = ({
  title,
  content,
}: Pick<ConfirmStoreState, "title" | "content">): Promise<boolean> =>
  new Promise((resolve) => {
    let isResolved = false;

    const isAlreadyOpen =
      useConfirmStore.getState().state === CONFIRM_STATE.ACTIVE;
    if (isAlreadyOpen) {
      console.warn("Confirm is already open");
      return false;
    }

    const settle = (wasConfirmed: boolean) => {
      if (isResolved) {
        return;
      }

      isResolved = true;
      resolve(wasConfirmed);
      useConfirmStore.setState({ ...emptyConfirmStore });
    };

    useConfirmStore.setState({
      state: CONFIRM_STATE.ACTIVE,
      onConfirm: () => settle(true),
      onCancel: () => settle(false),
      title,
      content,
    });
  });

export default useConfirmStore;
