import NodeRichMessage from "../../shared/NodeRichMessage";
import { TypeNodeData } from "./setup";

type Props = {
  id: string;
  data: TypeNodeData;
};

export function NodeStartContent(_props: Props) {
  return <NodeRichMessage>All new queries start here.</NodeRichMessage>;
}

export default NodeStartContent;
