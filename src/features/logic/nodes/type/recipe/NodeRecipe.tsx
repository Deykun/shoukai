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
import NodeHandlesWrapper from "../../shared/NodeHandlesWrapper";

type Props = NodeProps<TypeNode>;

export function NodeRecipe({ id, type, selected, data }: Props) {
  const { t } = useTranslation();

  return (
    <NodePanel nodeId={id} isSelected={selected}>
      <NodeHandle type="target" position={Position.Left} />
      <NodeHeader
        id={id}
        isSelected={selected}
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
      <NodeHandlesWrapper>
        <NodeHandle
          id="success"
          variant="horizontal"
          type="source"
          position={Position.Right}
        >
          Has results
        </NodeHandle>
        <NodeHandle
          id="error"
          variant="horizontal"
          type="source"
          position={Position.Right}
        >
          No results
        </NodeHandle>
      </NodeHandlesWrapper>
    </NodePanel>
  );
}
