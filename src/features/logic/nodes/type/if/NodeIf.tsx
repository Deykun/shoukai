import { NodeProps, Position } from "@xyflow/react";
import NodePanel from "../../shared/NodePanel";
import { NodeHandle } from "../../shared/NodeHandle";
import NodeHeader from "../../shared/NodeHeader";
import NodeOptions from "../../shared/NodeOptions";
import NodeIfContent from "./NodeIfContent";
import { TypeNode } from "./setup";

type Props = NodeProps<TypeNode>;

export function NodeIf({ id, type, selected, data }: Props) {
  return (
    <NodePanel className="" isSelected={selected}>
      <NodeOptions isSelected={selected} onEdit={() => console.log("edit")} />
      <NodeHandle
        type="target"
        position={Position.Top}
        className="bottom-full left-1/2"
      />
      <NodeHeader id={id} type={type} label={data.label} />
      <NodeIfContent id={id} data={data} />
      <div className="text-[8px]">
        <div className="flex justify-center gap-0.5">
          <NodeHandle
            id="source"
            variant="horizontal"
            type="source"
            position={Position.Bottom}
          >
            True
          </NodeHandle>
          <NodeHandle
            id="error"
            variant="horizontal"
            type="source"
            position={Position.Bottom}
          >
            False
          </NodeHandle>
        </div>
      </div>
    </NodePanel>
  );
}
