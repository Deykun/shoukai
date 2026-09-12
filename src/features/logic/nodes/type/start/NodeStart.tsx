import { NodeProps, Position } from "@xyflow/react";
import NodePanel from "../../shared/NodePanel";
import NodeHeader from "../../shared/NodeHeader";
import NodeOptions from "../../shared/NodeOptions";
import NodeStartContent from "./NodeStartContent";
import { NodeHandle } from "../../shared/NodeHandle";
import { TypeNode } from "./setup";
import NodeHandlesWrapper from "../../shared/NodeHandlesWrapper";

type Props = NodeProps<TypeNode>;

export function NodeStart({ id, type, selected, data }: Props) {
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
        <NodeHandle
          id="action"
          variant="horizontal"
          type="source"
          position={Position.Right}
        >
          <span className="text-[8px] mr-auto">gm</span> Open map
        </NodeHandle>
        <NodeHandle
          id="action"
          variant="horizontal"
          type="source"
          position={Position.Right}
        >
          <span className="text-[8px] mr-auto">?</span> Ask chat
        </NodeHandle>
        <NodeHandle
          id="action"
          variant="horizontal"
          type="source"
          position={Position.Right}
        >
          <span className="text-[8px] mr-auto">pl</span> Translate
        </NodeHandle>
      </NodeHandlesWrapper>
      <NodeHandlesWrapper label="Default">
        <NodeHandle
          id="success"
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
