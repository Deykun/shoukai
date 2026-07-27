import { NodeProps, Position } from "@xyflow/react";
import NodePanel from "./shared/NodePanel";
import NodeTitle from "./shared/NodeTitle";
import NodeIcon from "./shared/NodeIcon";
import { NodeHandle } from "./shared/NodeHandle";
import { TypeNodeStart } from "@/features/logic/types";

type Props = NodeProps<TypeNodeStart>;

export function NodeStart({ id, type, selected, data }: Props) {
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  return (
    <NodePanel className="" isSelected={selected}>
      <NodeIcon type={type} />
      <NodeTitle>{data.label}</NodeTitle>
      <p>{data.description}</p>
      <NodeHandle type="source" position={Position.Right} />
    </NodePanel>
  );
}
