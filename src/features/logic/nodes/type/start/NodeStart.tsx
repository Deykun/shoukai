import { NodeProps, Position } from "@xyflow/react";
import NodePanel from "../../shared/NodePanel";
import NodeHeader from "../../shared/NodeHeader";
import NodeOptions from "../../shared/NodeOptions";
import NodeStartContent from "./NodeStartContent";
import { NodeHandle } from "../../shared/NodeHandle";
import { TypeNode } from "./setup";
import NodeHandlesWrapper from "../../shared/NodeHandlesWrapper";
import { NodeHandleShortcut } from "../../shared/NodeHandleShortcut";
import ButtonText from "@/components/UI/ButtonText";
import IconPlus from "@/components/Icons/IconPlus";
import { updateNode } from "@/features/logic/stores/actions/nodeDataUpdates";
import { generateId } from "@/utils/ids";
import { ShoukaiShortcut } from "../schema";
import { executeNode } from "@/features/logic-runner/nodes/start/execute";
import { useEffect } from "react";
import { runnerContextStart } from "@/features/logic-runner/stores/useRunnerContextStore";

type Props = NodeProps<TypeNode>;

declare global {
  interface Window {
    executeNode: (phrase: string) => void;
  }
}

export function NodeStart({ id, type, selected, data }: Props) {
  useEffect(() => {
    window.executeNode = (phrase: string) => {
      runnerContextStart(phrase);
      executeNode({
        runType: "test",
        nodeId: id,
        data,
      });
    };
  });

  return (
    <NodePanel nodeId={id} isSelected={selected}>
      <NodeOptions isSelected={selected} onEdit={() => console.log("edit")} />
      <NodeHeader
        id={id}
        isSelected={selected}
        type={type}
        label={data.label}
      />
      <NodeStartContent id={id} data={data} />
      <NodeHandlesWrapper
        label="Shortcuts"
        about="If a phrase starts or ends with a keyword, the shortcut is activated and the default flow is stopped. For example, typing 'g' will open Google with the phrase and skip the entire flow."
      >
        {data.shortcuts.map((shortcut) => (
          <NodeHandleShortcut
            nodeId={id}
            key={shortcut.id}
            shortcut={shortcut}
            onChange={(patch) =>
              updateNode(id, {
                shortcuts: data.shortcuts.map((item) =>
                  item.id === shortcut.id
                    ? ({ ...item, ...patch } as ShoukaiShortcut)
                    : item,
                ),
              })
            }
            onRemove={() =>
              updateNode(id, {
                shortcuts: data.shortcuts.filter(
                  (item) => item.id !== shortcut.id,
                ),
              })
            }
          />
        ))}
      </NodeHandlesWrapper>
      <ButtonText
        wrapperClassName="ml-auto"
        size="small"
        onClick={() => {
          updateNode(id, {
            shortcuts: [
              ...data.shortcuts,
              {
                type: "search-text",
                searchEngine: "defaultSearch",
                id: generateId(),
                name: "New shortcut",
                phrase: "{{phrase}}",
                triggers: ["new"],
              } satisfies ShoukaiShortcut,
            ],
          });
        }}
      >
        <IconPlus />
        <span>Add shortcut</span>
      </ButtonText>
      <NodeHandlesWrapper label="Default">
        <NodeHandle
          nodeId={id}
          handleId="success"
          variant="horizontal"
          type="source"
          position={Position.Right}
        >
          New search
        </NodeHandle>
      </NodeHandlesWrapper>
    </NodePanel>
  );
}
