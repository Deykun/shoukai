import NodeRichMessage from "../../shared/NodeRichMessage";
import { FlowSelect } from "@/features/logic/components/controls/FlowSelect/FlowSelect";
import { nodeSchema, TypeNodeData } from "./setup";

type Props = {
  id: string;
  data: TypeNodeData;
};

export function NodeOpenContent({ id, data }: Props) {
  return (
    <NodeRichMessage>
      Open{" "}
      <FlowSelect
        type="engine"
        nodeId={id}
        dataPath="engine"
        value={data.engine}
        schema={nodeSchema}
      />
      with
      <FlowSelect
        nodeId={id}
        dataPath="phrase"
        value={data.phrase}
        schema={nodeSchema}
      />
    </NodeRichMessage>
  );
}

export default NodeOpenContent;
