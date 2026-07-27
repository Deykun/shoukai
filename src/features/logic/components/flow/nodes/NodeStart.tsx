import { NodeProps, Position } from "@xyflow/react";
import NodePanel from "./shared/NodePanel";
import { NodeHandle } from "./shared/NodeHandle";
import { TypeNodeStart } from "@/features/logic/types";
import NodeHeader from "./shared/NodeHeader";

type Props = NodeProps<TypeNodeStart>;

export function NodeStart({ id, type, selected, data }: Props) {
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  return (
    <NodePanel className="" isSelected={selected}>
      <NodeHandle type="source" position={Position.Right} />
      <NodeHeader
        type={type}
        label={data.label}
        description={data.description}
      />
    </NodePanel>
  );
}
