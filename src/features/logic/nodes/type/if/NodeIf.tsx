import { NodeProps, Position } from "@xyflow/react";
import NodePanel from "../../shared/NodePanel";
import { NodeHandle } from "../../shared/NodeHandle";
import NodeHeader from "../../shared/NodeHeader";
import NodeOptions from "../../shared/NodeOptions";
import NodeIfContent from "./NodeIfContent";
import { TypeNode } from "./setup";
import NodeHandlesWrapper from "../../shared/NodeHandlesWrapper";

type Props = NodeProps<TypeNode>;

export function NodeIf({ id, type, selected, data }: Props) {
  return (
    <NodePanel nodeId={id} isSelected={selected}>
      <NodeOptions isSelected={selected} onEdit={() => console.log("edit")} />
      <NodeHandle type="target" position={Position.Left} />
      <NodeHeader
        id={id}
        isSelected={selected}
        type={type}
        label={data.label}
      />
      <NodeIfContent id={id} data={data} />
      <NodeHandlesWrapper>
        <NodeHandle
          id="success"
          variant="horizontal"
          type="source"
          position={Position.Right}
        >
          True
        </NodeHandle>
        <NodeHandle
          id="error"
          variant="horizontal"
          type="source"
          position={Position.Right}
        >
          False
        </NodeHandle>
      </NodeHandlesWrapper>
    </NodePanel>
  );
}
