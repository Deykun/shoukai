import { memo, useCallback, useEffect, useState } from "react";
import { cn } from "@/utils/tailwind";

import useFormulaInputHelpers from "@/features/formula-input/hooks/useFormulaInputHelpers";

import FormulaTextInput from "./core/FormulaTextInput";
import FormulaButtonReference from "./core/FormulaButtonReference";
import FormulaInputDropdown from "./dropdown/FormulaInputDropdown";
import useOpenWithOutsideClick from "@/hooks/useOpenWithOutsideClick";
import FormulaButtonClear from "./core/FormulaButtonClear";
import FormulaButtonAddVariable from "./core/FormulaButtonAddVariable";
import type { Chunk } from "@/features/formula-input/types";

type Props = {
  value: Chunk[];
  onChange: (chunks: Chunk[]) => void;
  references: string[] | undefined;
  autoFocus?: boolean;
};

const FormulaInputRaw = ({
  value,
  onChange,
  references = [],
  autoFocus = false,
}: Props) => {
  const { outsideRef, isOpen, setIsOpen } = useOpenWithOutsideClick(false);

  const {
    chunks,
    inputsRef,
    handleCaretChange,
    handleInputUpdate,
    handleInsertReference,
    handleReplaceReference,
    handleVariableTrigger,
    handleClear,
    handleMergePrevious,
    handleCaretExit,
    handleContainerClick,
    focusEnd,
  } = useFormulaInputHelpers({ value, onChange });

  // Mount only: caret at the end of the formula, like clicking the container.
  useEffect(() => {
    if (autoFocus) {
      focusEnd();
    }
  }, []);

  // Chunk index of the reference being edited; null = adding at the caret.
  const [editedIndex, setEditedIndex] = useState<number | null>(null);
  const activeIndex = isOpen ? editedIndex : null;
  const activeChunk = activeIndex === null ? undefined : chunks[activeIndex];
  const activeReference =
    activeChunk?.type === "variable" ? activeChunk.reference : undefined;

  const handleAddClick = useCallback(() => {
    setEditedIndex(null);
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleReferenceClick = useCallback(
    (index: number) => {
      setEditedIndex(index);
      setIsOpen(true);
    },
    [setIsOpen],
  );

  const handleTrigger = useCallback(
    (index: number, value: string, caretPosition: number) => {
      handleVariableTrigger(index, value, caretPosition);
      setEditedIndex(null);
      setIsOpen(true);
    },
    [handleVariableTrigger, setIsOpen],
  );

  const handleSelect = useCallback(
    (reference: string) => {
      if (activeIndex === null) {
        handleInsertReference(reference);
      } else {
        handleReplaceReference(activeIndex, reference);
      }

      setEditedIndex(null);
      setIsOpen(false);
    },
    [activeIndex, handleInsertReference, handleReplaceReference, setIsOpen],
  );

  return (
    <div className={cn("flex items-start gap-6")}>
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
        )}
      >
        {chunks.map((chunk, index) => {
          if (chunk.type === "variable") {
            return (
              <FormulaButtonReference
                key={index}
                reference={chunk.reference}
                onClick={() => handleReferenceClick(index)}
                isActive={activeIndex === index}
              />
            );
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
              onVariableTrigger={(value, caretPosition) =>
                handleTrigger(index, value, caretPosition)
              }
            />
          );
        })}
        {isOpen && (
          <FormulaInputDropdown
            outsideRef={outsideRef}
            onSelect={handleSelect}
            references={references}
            activeReference={activeReference}
          />
        )}
      </div>
      {references.length > 0 && (
        <FormulaButtonAddVariable
          className="mt-3"
          onClick={handleAddClick}
          isActive={isOpen && activeIndex === null}
        />
      )}
      <FormulaButtonClear
        className="mt-3"
        onClick={handleClear}
        isDisabled={
          chunks.length === 1 &&
          chunks[0].type === "input" &&
          chunks[0].value.length === 0
        }
      />
    </div>
  );
};

export default memo(FormulaInputRaw);
