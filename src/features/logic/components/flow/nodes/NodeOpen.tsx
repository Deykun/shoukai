import { NodeProps, Position, type Node } from "@xyflow/react";
import NodePanel from "./shared/NodePanel";
import { NodeHandle } from "./shared/NodeHandle";
import { NodeSharedData } from "@/features/logic/types";
import NodeHeader from "./shared/NodeHeader";
import NodeOptions from "./shared/NodeOptions";
import ButtonIcon from "@/components/UI/ButtonIcon";
import IconSearchSettings from "@/components/Icons/IconSearchSettings";
import { useTranslation } from "react-i18next";
import { ShoukaiSearchEngine } from "@/constants";
import { FlowSelect } from "../../controls/FlowSelect/FlowSelect";
import NodeRichMessage from "./shared/NodeRichMessage";

export type TypeNode = Node<
  {
    type: "search" | "img" | "map";
    engine: ShoukaiSearchEngine;
  } & NodeSharedData,
  "open"
>;

export const defaultData: TypeNode["data"] = {
  label: "Open",
  description: "Recipe",
  type: "search",
  engine: "default",
};

type Props = NodeProps<TypeNode>;

export function NodeOpen({ id, type, selected, data }: Props) {
  const { t } = useTranslation();
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  return (
    <NodePanel className="" isSelected={selected}>
      <NodeHandle type="target" position={Position.Top} />
      <NodeHeader
        type={type}
        label={data.label}
        // description={data.description}
      />
      <NodeOptions isSelected={selected}></NodeOptions>

      <NodeRichMessage>
        Open <FlowSelect value={["Google"]} setValue={() => {}} />
        with
        <FlowSelect value={["{phrase}"]} setValue={() => {}} />
          .
      </NodeRichMessage>
    </NodePanel>
  );
}
