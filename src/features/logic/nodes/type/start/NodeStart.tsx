import { NodeProps, Position } from "@xyflow/react";
import { useTranslation } from "react-i18next";
import NodePanel from "../../shared/NodePanel";
import NodeHeader from "../../shared/NodeHeader";
import NodeOptions from "../../shared/NodeOptions";
import NodeRichMessage from "../../shared/NodeRichMessage";
import { NodeHandle } from "../../shared/NodeHandle";
import { TypeNode } from "./setup";

type Props = NodeProps<TypeNode>;

export function NodeStart({ id, type, selected, data }: Props) {
  const { t } = useTranslation();
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  return (
    <NodePanel className="" isSelected={selected}>
      <NodeOptions isSelected={selected} onEdit={() => console.log("edit")} />
      <NodeHeader
        type={type}
        // label={data.label}
        label="Shoukai"
        // description={data.description}
      />
      <NodeRichMessage>All new queries start here.</NodeRichMessage>
      <div className="flex justify-center gap-0.5">
        <NodeHandle
          id="success"
          variant="horizontal"
          type="source"
          position={Position.Bottom}
        >
          New search
        </NodeHandle>
      </div>
    </NodePanel>
  );
}
