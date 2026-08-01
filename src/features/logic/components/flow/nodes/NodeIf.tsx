import { NodeProps, Position, type Node } from "@xyflow/react";
import NodePanel from "./shared/NodePanel";
import { NodeHandle } from "./shared/NodeHandle";
import { NodeSharedData } from "@/features/logic/types";
import NodeHeader from "./shared/NodeHeader";
import { useTranslation } from "react-i18next";
import NodeOptions from "./shared/NodeOptions";
import { FlowSelect } from "../../controls/FlowSelect/FlowSelect";
import { cn } from "@/utils/tailwind";
import NodeRichMessage from "./shared/NodeRichMessage";

export const COMPARE_OPERATOR = {
  CONTAINS: "contains",
  EQUALS: "equals",
  STARTS_WITH: "startsWith",
  ENDS_WITH: "endsWith",
} as const;

export type CompareOperator =
  (typeof COMPARE_OPERATOR)[keyof typeof COMPARE_OPERATOR];

const COMPARE_OPERATORS = Object.values(COMPARE_OPERATOR);

export type TypeNode = Node<
  {
    x: string[];
    compare: CompareOperator;
    y: string[];
  } & NodeSharedData,
  "if"
>;

export const defaultData: TypeNode["data"] = {
  label: "if",
  description: "Description",
  x: ["{phrase}"],
  compare: "contains",
  y: ["something"],
};

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
