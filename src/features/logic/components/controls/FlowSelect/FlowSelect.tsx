import ButtonText from "@/components/UI/ButtonText";
import { updateNode } from "@/features/logic/stores/useDiagramStore";
import { cn } from "@/utils/tailwind";
import { memo, useState } from "react";
import z from "zod";

type Props = {
  nodeId: string;
  dataPath: string;
  value: string | string[];
  schema: z.ZodObject | undefined;
  // setValue: (value: string[]) => void;
};

export const FlowSelect = memo(({ nodeId, value, schema }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const valueAsArray = Array.isArray(value) ? value : [value];

  const handleClick = () => {
    updateNode(nodeId, {
      compare: value === "equals" ? "startsWith" : "equals",
    });
  };

  console.log("options", schema?.shape?.compare?.options);

  return (
    <div className="relative">
      <ButtonText onClick={() => setIsOpen(!isOpen)} size="small">
        <span>{valueAsArray.join(" / ")}</span>
      </ButtonText>
      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-1/2 -translate-x-1/2 z-[100]",
            "p-3",
            "bg-body",
            "rounded-[18px] shadow-sm",
            "border-[#f5f9ef] border",
            "mx-auto font-[500] text-[16px]",
            "hover:border-[#f5f9ef] hover:shadow-md",
            "duration-500",
          )}
        >
          {(schema?.shape?.compare?.options || []).map((option) => (
            <ButtonText
              size="small"
              isActive={option === value}
              onClick={() => {
                updateNode(nodeId, {
                  compare: option,
                });
                setIsOpen(false);
              }}
            >
              <span>{option}</span>
            </ButtonText>
          ))}
        </div>
      )}
    </div>
  );
});
