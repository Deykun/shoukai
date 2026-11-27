import { beforeEach, describe, expect, it, vi } from "vitest";
import { defaultData, TypeNode } from "../../nodes/type/start/setup";
import { removeNodeDataPath, updateNode } from "./nodeDataUpdates";
import useDiagramStore, { getNodes } from "../useDiagramStore";

// persist needs localStorage, which the node test env doesn't have
vi.mock("zustand/middleware", async (importOriginal) => ({
  ...(await importOriginal<typeof import("zustand/middleware")>()),
  persist: (initializer: unknown) => initializer,
}));

const NODE_ID = "start";

const getStartData = () => getNodes()[0].data as TypeNode["data"];

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});

  useDiagramStore.setState({
    nodes: [
      {
        id: NODE_ID,
        type: "start",
        position: { x: 0, y: 0 },
        data: defaultData,
      },
    ],
    edges: [],
    cache: { nodesIndexById: {} },
  });
});

describe("updateNode", () => {
  it("should merge data and keep the rest", () => {
    updateNode(NODE_ID, { label: "Changed" });

    expect(getStartData().label).toBe("Changed");
    expect(getStartData().shortcuts).toEqual(defaultData.shortcuts);
  });

  it("should replace arrays instead of merging them", () => {
    const [first] = defaultData.shortcuts;

    updateNode(NODE_ID, { shortcuts: [first] });

    expect(getStartData().shortcuts).toEqual([first]);
  });

  it("should skip the update if merged data is invalid", () => {
    updateNode(NODE_ID, { label: 1 as unknown as string });

    expect(getStartData()).toEqual(defaultData);
    expect(console.error).toHaveBeenCalledOnce();
  });

  it("should skip the update if node does not exist", () => {
    const nodesBefore = getNodes();

    updateNode("missing", { label: "Changed" });

    expect(getNodes()).toBe(nodesBefore);
    expect(console.error).toHaveBeenCalledOnce();
  });
});

describe("removeNodeDataPath", () => {
  it("should keep data if path does not exist", () => {
    removeNodeDataPath(NODE_ID, "missing" as "label");

    expect(getStartData()).toEqual(defaultData);
    expect(console.error).not.toHaveBeenCalled();
  });

  it("should skip the removal if data without the key is invalid", () => {
    removeNodeDataPath(NODE_ID, "label");

    expect(getStartData()).toEqual(defaultData);
    expect(console.error).toHaveBeenCalledOnce();
  });
});
