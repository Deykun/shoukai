import { cn } from "@/utils/tailwind";
import { useFormulaBuilderDropdown } from "../hooks/useFormulaBuilderDropdown";
import { resizeFormulaBuilder } from "../utils/resizeFormulaBuilder";
import { focusFormulaBuilder } from "../utils/focusFormulaBuilder";
import FormulaBuilderDropdown from "./dropdown/FormulaBuilderDropdown";
import { ChangeEvent, useCallback, useRef } from "react";
import { FormulaBuilderValue } from "./value/FormulaBuilderValue";

type Props = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  references: string[] | undefined;
  autoFocus?: boolean;
  trigger?: string;
};

const SHARED_STYLES = cn(
  "relative",
  "block m-0 p-0",
  "col-start-1 row-start-1",
  // "whitespace-pre-line",
  "whitespace-pre-wrap",
  "break-words",
  "overflow-hidden",
  "min-h-full",
  "text-center",
);

export const FormulaBuilder = (props: Props) => {
  const {
    className = "",
    value,
    onChange,
    references = [],
    autoFocus = false,
  } = props;
  const {
    setInsideRef,
    isOpen,
    caretType,
    caretReference,
    handleReferencePicked,
    handleSelect,
    handleFocus,
  } = useFormulaBuilderDropdown(props);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <>
      <div
        ref={wrapperRef}
        onClick={focusFormulaBuilder}
        className={cn(
          "relative",
          "grid",
          "py-4 px-6",
          "w-full",
          "text-center",
          "relative",
          "rounded-[18px]",
          "bg-white",
          "rounded-[24px] shadow-md",
          "border-[#f5f9ef] border",
          "mx-auto font-[500] text-[14px]",
          "hover:border-[#f5f9ef] hover:shadow-lg",
          "duration-500",
          "tracking-wider",
          className,
        )}
      >
        <FormulaBuilderValue
          className={cn(SHARED_STYLES, "text-body-contrast")}
          value={value}
          references={references}
        />
        <textarea
          className={cn(
            SHARED_STYLES,
            // Growing input
            "field-sizing-content",
            "resize-none",
            "outline-none",
            "bg-transparent text-transparent",
            {
              "caret-primary-contrast": caretType === "reference",
            },
          )}
          value={value}
          onFocus={handleFocus}
          onChange={handleChange}
          onSelect={handleSelect}
          onKeyDown={resizeFormulaBuilder}
          onKeyUp={resizeFormulaBuilder}
          spellCheck={false}
          rows={1}
          autoFocus={autoFocus}
        />
        {isOpen && (
          <FormulaBuilderDropdown
            insideRef={setInsideRef}
            // setInsideRef={() => {}}
            onSelect={handleReferencePicked}
            references={references}
            activeReference={caretReference}
          />
        )}
      </div>
    </>
  );
};
