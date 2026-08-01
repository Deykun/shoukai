import { NodeProps, Position } from "@xyflow/react";
import NodePanel from "../../shared/NodePanel";
import { NodeHandle } from "../../shared/NodeHandle";
import NodeHeader from "../../shared/NodeHeader";
import { useTranslation } from "react-i18next";
import NodeOptions from "../../shared/NodeOptions";
import NodeRichMessage from "../../shared/NodeRichMessage";
import { FlowSelect } from "@/features/logic/components/controls/FlowSelect/FlowSelect";
import { COMPARE_OPERATORS, TypeNode } from "./setup";

type Props = NodeProps<TypeNode>;

export function NodeIf({ id, type, selected, data }: Props) {
  const { t } = useTranslation();
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  return (
    <NodePanel className="" isSelected={selected}>
      <NodeOptions isSelected={selected} onEdit={() => console.log("edit")} />
      <NodeHandle
        type="target"
        position={Position.Top}
        className="bottom-full left-1/2"
      />
      <NodeHeader
        type={type}
        // label={data.label}
        label="If"
        // description={data.description}
      />
      <NodeRichMessage>
        If
        <FlowSelect
          nodeId={id}
          dataPath="x"
          value={data.x}
        />
        <FlowSelect
          nodeId={id}
          dataPath="compare"
          value={data.compare}
          options={COMPARE_OPERATORS}
        />
        <FlowSelect
          nodeId={id}
          dataPath="y"
          value={data.y}
        />
        .
      </NodeRichMessage>
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
