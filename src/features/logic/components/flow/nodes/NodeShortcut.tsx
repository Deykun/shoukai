import { NodeProps, Position } from "@xyflow/react";
import NodePanel from "./shared/NodePanel";
import { NodeHandle } from "./shared/NodeHandle";
import { TypeNodeShortcut } from "@/features/logic/types";
import NodeHeader from "./shared/NodeHeader";

type Props = NodeProps<TypeNodeShortcut>;

export function NodeShortcut({ id, type, selected, data }: Props) {
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  return (
    <NodePanel className="" isSelected={selected}>
      <NodeHandle type="target" position={Position.Left} />
      <NodeHeader
        type={type}
        label={data.label}
        description={data.description}
      />
      {data.phrase}
    </NodePanel>
  );
}
