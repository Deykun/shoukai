import { cn } from "@/utils/tailwind";
import { resizeFormulaBuilder } from "../utils/resizeFormulaBuilder";
import { focusFormulaBuilder } from "../utils/focusFormulaBuilder";

type Props = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

export const FormulaBuilder = ({ className = "", value, onChange }: Props) => {
  return (
    <div
      onClick={focusFormulaBuilder}
      className={cn(
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
      <textarea
        className={cn(
          "block m-0 p-0",
          "col-start-1 row-start-1",
          "text-center",
          // Grows
          "field-sizing-content",
          "whitespace-pre-line",
          "overflow-hidden",
          "min-h-full",
          "resize-none",
          "outline-none",
          "bg-transparent text-transparent caret-[#005b46]",
          // "bg-transparent text-[#f00d] caret-[#005b46]",
        )}
        value={value}
        onChange={(e) => onChange(e.target.value.replaceAll(/ {2,}/g, " "))}
        onKeyDown={resizeFormulaBuilder}
        onKeyUp={resizeFormulaBuilder}
        spellCheck={false}
        rows={1}
      />
      <div
        className={cn(
          "block m-0 p-0",
          "col-start-1 row-start-1",
          "pointer-events-none",
          // Respects enters
          "whitespace-pre-line",
          "overflow-hidden",
          "min-h-full",
          "text-body-contrast",
        )}
      >
        {value}
        {/* {value.split("").map((s) => ( */}
        {/* <span>{s}</span> */}
        {/* ))} */}
      </div>
    </div>
  );
};
