import { cn } from "@/utils/tailwind";
import { useFormulaBuilderDropdown } from "../hooks/useFormulaBuilderDropdown";
import { resizeFormulaBuilder } from "../utils/resizeFormulaBuilder";
import { focusFormulaBuilder } from "../utils/focusFormulaBuilder";
import FormulaBuilderDropdown from "./dropdown/FormulaBuilderDropdown";
import { ChangeEvent, useCallback } from "react";
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
  "whitespace-pre-line",
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
  const { outsideRef, isOpen, handleSelect } = useFormulaBuilderDropdown(props);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value.replaceAll(/ {2,}/g, " ");
      onChange(newValue);
    },
    [onChange],
  );

  return (
    <>
      <div
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
        />
        <textarea
          className={cn(
            SHARED_STYLES,
            // Growing input
            "field-sizing-content",
            "resize-none",
            "outline-none",
            "bg-transparent text-transparent caret-[#005b46]",
          )}
          defaultValue={value}
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
            outsideRef={outsideRef}
            // outsideRef={() => {}}
            onSelect={() => {}}
            references={references}
          />
        )}
      </div>
    </>
  );
};
