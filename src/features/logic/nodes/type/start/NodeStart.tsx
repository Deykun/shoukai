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
      <NodeHandlesWrapper>
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
