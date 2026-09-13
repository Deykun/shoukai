import NodeRichMessage from "../../shared/NodeRichMessage";
import { FlowSelect } from "@/features/logic/components/controls/FlowSelect/FlowSelect";
import { nodeSchema, TypeNodeData } from "./setup";

type Props = {
  id: string;
  data: TypeNodeData;
};

export function NodeRecipeContent({ id, data }: Props) {
  return (
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
      with{" "}
      <FlowSelect
        type="engine"
        nodeId={id}
        dataPath="search.engine"
        value={data.search.engine}
        schema={nodeSchema}
      />
    </NodeRichMessage>
  );
}

export default NodeRecipeContent;
