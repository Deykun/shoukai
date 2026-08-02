import ButtonText from "@/components/UI/ButtonText";
import { updateNode } from "@/features/logic/stores/useDiagramStore";
import { memo } from "react";
import z from "zod";

type Props = {
  nodeId: string;
  dataPath: string;
  value: string | string[];
  schema: z.ZodObject | undefined;
  // setValue: (value: string[]) => void;
};

export const FlowSelect = memo(({ nodeId, value, schema }: Props) => {
  const valueAsArray = Array.isArray(value) ? value : [value];

  const handleClick = () => {
    updateNode(nodeId, {
      compare: value === "equals" ? "startsWith" : "equals",
    });
  };

  console.log("options", schema?.shape?.compare?.options);

  return (
    <ButtonText onClick={handleClick} size="small">
      <span>{valueAsArray.join(" / ")}</span>
    </ButtonText>
  );
});
