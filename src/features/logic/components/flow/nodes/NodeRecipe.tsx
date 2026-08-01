import { NodeProps, Position, type Node } from "@xyflow/react";
import NodePanel from "./shared/NodePanel";
import { NodeHandle } from "./shared/NodeHandle";
import { NodeSharedData } from "@/features/logic/types";
import NodeHeader from "./shared/NodeHeader";
import ButtonIcon from "@/components/UI/ButtonIcon";
import IconSearchSettings from "@/components/Icons/IconSearchSettings";
import { useTranslation } from "react-i18next";
import NodeOptions from "./shared/NodeOptions";
import { ShoukaiSearchEngine } from "@/constants";
import NodeRichMessage from "./shared/NodeRichMessage";
import { FlowSelect } from "../../controls/FlowSelect/FlowSelect";
import { FlowSelectSearchEngine } from "../../controls/FlowSelect/FlowSelectSearchEngine";

export type TypeNode = Node<
  {
    search: {
      phrase: string;
      domain: string;
      engine: ShoukaiSearchEngine;
    };
  } & NodeSharedData,
  "recipe"
>;

export const defaultData: TypeNode["data"] = {
  label: "Recipe",
  description: "Recipe",
  search: {
    phrase: "",
    domain: "",
    engine: "default",
  },
};

type Props = NodeProps<TypeNode>;

export function NodeRecipe({ id, type, selected, data }: Props) {
  const { t } = useTranslation();
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  return (
    <NodePanel className="" isSelected={selected}>
      <NodeHandle type="target" position={Position.Top} />
      <NodeHeader
        type={type}
        // label={data.label}
        // description={data.description}
        label="Pogoda"
      />
      <NodeOptions isSelected={selected}>
        <ButtonIcon
          // onClick={() => toggleRecipeModal(id)}
          label={t("search.settings")}
          labelPosition="bottom"
          // isActive={isModalOpen}
        >
          <IconSearchSettings />
        </ButtonIcon>
      </NodeOptions>
      <NodeRichMessage>
        Looking up
        <FlowSelect value={["{phraseLocation}"]} setValue={() => {}} />
        on
        <FlowSelect value={["weather.com"]} setValue={() => {}} />
        with <FlowSelectSearchEngine value={["google"]} setValue={() => {}} />.
      </NodeRichMessage>
      <div className="flex justify-center gap-0.5">
        <NodeHandle
          id="source"
          variant="horizontal"
          type="source"
          position={Position.Bottom}
        >
          Has results
        </NodeHandle>
        <NodeHandle
          id="error"
          variant="horizontal"
          type="source"
          position={Position.Bottom}
        >
          No results
        </NodeHandle>
      </div>
    </NodePanel>
  );
}
