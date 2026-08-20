import { forwardRef, memo, type KeyboardEvent } from "react";
import { cn } from "@/utils/tailwind";

type Props = {
  value: string;
  onUpdate: (value: string, caretPosition: number) => void;
  onCaretExit: (direction: -1 | 1) => void;
  onMergePrevious: () => void;
};

const FormulaTextInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onUpdate, onCaretExit, onMergePrevious }, ref) => {
    // Arrows at the edges of the text hop to the neighbouring input.
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      const { selectionStart, selectionEnd } = event.currentTarget;

      if (selectionStart === null || selectionStart !== selectionEnd) {
        return;
      }

      // Always prevent the default once we take over: focus has moved on by
      // the time the browser would apply it, so it would hit the neighbour.
      if (event.key === "ArrowLeft" && selectionStart === 0) {
        event.preventDefault();
        onCaretExit(-1);

        return;
      }

      if (event.key === "ArrowRight" && selectionStart === value.length) {
        event.preventDefault();
        onCaretExit(1);

        return;
      }

      if (event.key === "Backspace" && selectionStart === 0) {
        event.preventDefault();
        onMergePrevious();
      }
    };

    return (
      <input
        ref={ref}
        value={value}
        onChange={(e) =>
          onUpdate(
            e.target.value || "",
            e.target.selectionStart ?? (e.target.value || "").length,
          )
        }
        onKeyDown={handleKeyDown}
        className={cn(
            "py-0.5",
          "field-sizing-content",
          "outline-none",
          "bg-transparent ",
          "caret-[#82a849] tracking-wider",
          "hover:bg-[#f5f9ef] rounded-[8px]",
          "duration-200",
          "min-w-1",
        //   "border-[1px] border-[red]"
        )}
        style={{
          fieldSizing: "content",
        }}
      />
    );
  },
);

FormulaTextInput.displayName = "FormulaTextInput";

export default memo(FormulaTextInput);
