import { memo, useState } from "react";
import { cn } from "@/utils/tailwind";

import useFormulaInputHelpers from "@/features/formula-input/hooks/useFormulaInputHelpers";

import FormulaTextInput from "./core/FormulaTextInput";
import FormulaButtonAddReference from "./core/FormulaAddVariableButton";
import FormulaReference from "./core/FormulaReference";
import FormulaInputDropdown from "./dropdown/FormulaInputDropdown";
import useOpenWithOutsideClick from "@/hooks/useOpenWithOutsideClick";
import ButtonIcon from "@/components/UI/ButtonIcon";
import FormulaAddVariableButton from "./core/FormulaAddVariableButton";

const FormulaInput = () => {
  const { outsideRef, isOpen, setIsOpen } = useOpenWithOutsideClick(false);

  const {
    chunks,
    lastCaret,
    inputsRef,
    handleCaretChange,
    handleInputUpdate,
    handleInsertReference,
    handleMergePrevious,
    handleCaretExit,
    handleContainerClick,
  } = useFormulaInputHelpers();

  return (
    <div className={cn("flex gap-6")}>
      <FormulaAddVariableButton
        className="mt-3"
        onClick={() => setIsOpen(!isOpen)}
        isActive={isOpen}
      />
      <div
        onClick={handleContainerClick}
        className={cn(
          "relative",
          "w-full",
          "flex flex-row flex-wrap gap-[0.325em]",
          "justify-center items-center",
          "rounded-[18px]",
          "py-4 px-6",
          "bg-white",
          "rounded-[24px] shadow-md",
          "border-[#f5f9ef] border",
          "mx-auto font-[500] text-[14px]",
          "hover:border-[#f5f9ef] hover:shadow-lg",
          "duration-500",
          "ui-tooltip-wrapper",
        )}
      >
        {chunks.map((chunk, index) => {
          if (chunk.type === "variable") {
            return <FormulaReference key={index} reference={chunk.reference} />;
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
              onCaretChange={(caretPosition) =>
                handleCaretChange(index, caretPosition)
              }
              onCaretExit={(direction) => handleCaretExit(index, direction)}
              onMergePrevious={() => handleMergePrevious(index)}
            />
          );
        })}
        {isOpen && (
          <FormulaInputDropdown
            outsideRef={outsideRef}
            onSelect={handleInsertReference}
          />
        )}
      </div>
    </div>
  );
};

export default memo(FormulaInput);
