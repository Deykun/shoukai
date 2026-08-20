import { memo } from "react";
import { cn } from "@/utils/tailwind";

import useFormulaInputHelpers from "@/features/formula-input/hooks/useFormulaInputHelpers";

import FormulaTextInput from "./core/FormulaTextInput";

const FormulaInput = () => {
  const {
    chunks,
    inputsRef,
    handleInputUpdate,
    handleMergePrevious,
    handleCaretExit,
    handleContainerClick,
  } = useFormulaInputHelpers();

  return (
    <div
      onClick={handleContainerClick}
      className={cn(
        "relative",
        "flex flex-row flex-wrap gap-[0.25em]",
        "justify-center items-center",
        "rounded-[18px]",
        "py-4 px-6",
        "bg-white",
        "rounded-[24px] shadow-md",
        "border-[#f5f9ef] border",
        "mx-auto font-[500] text-[14px]",
        "hover:border-[#f5f9ef] hover:shadow-lg",
        "duration-500",
      )}
    >
      {chunks.map((chunk, index) => {
        if (chunk.type === "variable") {
          return <span key={index}>{chunk.reference}</span>;
        }

        return (
          <FormulaTextInput
            key={index}
            ref={(element) => {
              inputsRef.current[index] = element;
            }}
            value={chunk.value}
            onUpdate={(value, caretPosition) =>
              handleInputUpdate(index, value, caretPosition)
            }
            onCaretExit={(direction) => handleCaretExit(index, direction)}
            onMergePrevious={() => handleMergePrevious(index)}
          />
        );
      })}
    </div>
  );
};

export default memo(FormulaInput);
