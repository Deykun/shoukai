import { create } from "zustand";
import { devtools } from "zustand/middleware";

type RunEvent = {
  type: "start";
  phrase: string;
  timestamp: number;
};

export type HandleStatus = "rejected" | "active";

type HandleData = {
  status: HandleStatus;
  value?: [];
  comment?: string;
};

export type RunnerContextStoreState = {
  updateIndex: number;
  events: RunEvent[];
  global: {
    phrase: string;
  };
  nodes: Partial<{
    [nodeId: string]: Partial<{
      [handleId: string]: HandleData[];
    }>;
  }>;
};

const emptyRunnerContextStore: RunnerContextStoreState = {
  updateIndex: 0,
  events: [],
  global: {
    phrase: "",
  },
  nodes: {},
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

export const setPartialHandleState = ({
  nodeId,
  handleId,
  status,
  value,
  comment,
}: {
  nodeId: string;
  handleId: string;
} & HandleData) => {
  useRunnerContextStore.setState((state) => ({
    updateIndex: state.updateIndex + 1,
    nodes: {
      ...state.nodes,
      [nodeId]: {
        ...state.nodes[nodeId],
        [handleId]: [
          ...(state.nodes[nodeId]?.[handleId] ?? []),
          { status, value, comment },
        ],
      },
    },
  }));
};
