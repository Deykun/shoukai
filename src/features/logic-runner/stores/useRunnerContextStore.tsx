import { create } from "zustand";
import { devtools } from "zustand/middleware";

type RunEvent = {
  type: "start";
  phrase: string;
  timestamp: number;
};

export type RunnerContextStoreState = {
  events: RunEvent[];
  global: {
    phrase: string;
  };
};

const emptyRunnerContextStore: RunnerContextStoreState = {
  events: [],
  global: {
    phrase: "",
  },
};

export const useRunnerContextStore = create<RunnerContextStoreState>()(
  devtools(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_get, _set) => ({
      ...emptyRunnerContextStore,
    }),
    { name: "RunnerContextStore" },
  ),
);

export const runnerContextStart = (phrase: string) => {
  useRunnerContextStore.setState({
    ...emptyRunnerContextStore,
    events: [
      {
        type: "start",
        phrase,
        timestamp: Date.now(),
      },
    ],
    global: {
      ...emptyRunnerContextStore.global,
      phrase,
    },
  });
};
