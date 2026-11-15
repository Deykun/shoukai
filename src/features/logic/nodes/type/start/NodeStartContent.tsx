import NodeRichMessage from "../../shared/NodeRichMessage";
import { TypeNodeData } from "./setup";

type Props = {
  id: string;
  data: TypeNodeData;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NodeStartContent(_props: Props) {
  return <NodeRichMessage>All new queries start here.</NodeRichMessage>;
}

export default NodeStartContent;
