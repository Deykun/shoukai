import { NodeProps, Position } from "@xyflow/react";
import NodePanel from "../../shared/NodePanel";
import { NodeHandle } from "../../shared/NodeHandle";
import NodeHeader from "../../shared/NodeHeader";
import ButtonIcon from "@/components/UI/ButtonIcon";
import IconSearchSettings from "@/components/Icons/IconSearchSettings";
import { useTranslation } from "react-i18next";
import NodeOptions from "../../shared/NodeOptions";
import NodeRecipeContent from "./NodeRecipeContent";
import { TypeNode } from "./setup";

type Props = NodeProps<TypeNode>;

export function NodeRecipe({ id, type, selected, data }: Props) {
  const { t } = useTranslation();


  return (
    <NodePanel nodeId={id} isSelected={selected}>
      <NodeHandle type="target" position={Position.Top} />
      <NodeHeader
        id={id}
        type={type}
        label={data.label}
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
      <NodeRecipeContent id={id} data={data} />
      <div className="flex justify-center gap-0.5">
        <NodeHandle
          id="success"
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
