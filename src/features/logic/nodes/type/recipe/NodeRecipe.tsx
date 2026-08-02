import { NodeProps, Position } from "@xyflow/react";
import NodePanel from "../../shared/NodePanel";
import { NodeHandle } from "../../shared/NodeHandle";
import NodeHeader from "../../shared/NodeHeader";
import ButtonIcon from "@/components/UI/ButtonIcon";
import IconSearchSettings from "@/components/Icons/IconSearchSettings";
import { useTranslation } from "react-i18next";
import NodeOptions from "../../shared/NodeOptions";
import NodeRichMessage from "../../shared/NodeRichMessage";
import { FlowSelectSearchEngine } from "@/features/logic/components/controls/FlowSelect/FlowSelectSearchEngine";
import { FlowSelect } from "@/features/logic/components/controls/FlowSelect/FlowSelect";
import { nodeSchema, TypeNode } from "./setup";

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
        <FlowSelect
          nodeId={id}
          dataPath="search.phrase"
          value={data.search.phrase}
          schema={nodeSchema}
        />
        on
        <FlowSelect
          nodeId={id}
          dataPath="search.domain"
          value={data.search.domain}
          schema={nodeSchema}
        />
        with <FlowSelectSearchEngine value={"google"} />
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
