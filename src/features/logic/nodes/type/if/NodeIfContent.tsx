import NodeRichMessage from "../../shared/NodeRichMessage";
import { FlowSelect } from "@/features/logic/components/controls/FlowSelect/FlowSelect";
import { nodeSchema, TypeNodeData } from "./setup";

type Props = {
  id: string;
  data: TypeNodeData;
};

export function NodeIfContent({ id, data }: Props) {
  return (
    <NodeRichMessage>
      If
      <FlowSelect nodeId={id} dataPath="x" value={data.x} schema={nodeSchema} />
      <FlowSelect
        nodeId={id}
        dataPath="compare"
        value={data.compare}
        schema={nodeSchema}
      />
      <FlowSelect nodeId={id} dataPath="y" value={data.y} schema={nodeSchema} />
    </NodeRichMessage>
  );
}

export default NodeIfContent;
