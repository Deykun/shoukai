import { NodeProps, Position } from "@xyflow/react";
import NodePanel from "../../shared/NodePanel";
import { NodeHandle } from "../../shared/NodeHandle";
import NodeHeader from "../../shared/NodeHeader";
import NodeOptions from "../../shared/NodeOptions";
import NodeOpenContent from "./NodeOpenContent";
import { TypeNode } from "./setup";

type Props = NodeProps<TypeNode>;

export function NodeOpen({ id, type, selected, data }: Props) {
  return (
    <NodePanel className="" isSelected={selected}>
      <NodeHandle type="target" position={Position.Top} />
      <NodeHeader id={id} type={type} label={data.label} />
      <NodeOptions isSelected={selected}></NodeOptions>
      <NodeOpenContent id={id} data={data} />
    </NodePanel>
  );
}
