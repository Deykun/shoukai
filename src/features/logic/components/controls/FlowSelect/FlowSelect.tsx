import ButtonText from "@/components/UI/ButtonText";
import { updateNode } from "@/features/logic/stores/useDiagramStore";

type Props = {
  nodeId: string;
  dataPath: string;
  value: string | string[];
  // setValue: (value: string[]) => void;
};

export const FlowSelect = ({ nodeId, value, setValue }: Props) => {
  const valueAsArray = Array.isArray(value) ? value : [value];

  const handleClick = () => {
    updateNode(nodeId, {
      compare: value === "equals" ? "contains" : "equals",
    });
  };

  return (
    <ButtonText onClick={handleClick} size="small">
      <span>{valueAsArray.join(" / ")}</span>
    </ButtonText>
  );
};
