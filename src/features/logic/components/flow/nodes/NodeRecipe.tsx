import { NodeProps, Position } from "@xyflow/react";
import NodePanel from "./shared/NodePanel";
import NodeTitle from "./shared/NodeTitle";
import NodeIcon from "./shared/NodeIcon";
import { NodeHandle } from "./shared/NodeHandle";
import { TypeNodeRecipe } from "@/features/logic/types";
import NodeHeader from "./shared/NodeHeader";

type Props = NodeProps<TypeNodeRecipe>;

export function NodeRecipe({ id, type, selected, data }: Props) {
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  return (
    <NodePanel className="" isSelected={selected}>
      <NodeHandle type="target" position={Position.Left} />
      <NodeHandle type="source" position={Position.Right} />
      <NodeHeader
        type={type}
        label={data.label}
        description={data.description}
      />
    </NodePanel>
  );
}
