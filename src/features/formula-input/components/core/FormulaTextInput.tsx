import {
  forwardRef,
  memo,
  type KeyboardEvent,
  type SyntheticEvent,
} from "react";
import { cn } from "@/utils/tailwind";

type Props = {
  value: string;
  onUpdate: (value: string, caretPosition: number) => void;
  onCaretChange: (caretPosition: number) => void;
  onCaretExit: (direction: -1 | 1) => void;
  onMergePrevious: () => void;
};

const FormulaTextInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onUpdate, onCaretChange, onCaretExit, onMergePrevious }, ref) => {
    // Clicks, arrows and focus all move the caret without changing the value.
    const handleCaretChange = (event: SyntheticEvent<HTMLInputElement>) => {
      const { selectionStart, value: current } = event.currentTarget;

      onCaretChange(selectionStart ?? current.length);
    };

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
        onSelect={handleCaretChange}
        onKeyUp={handleCaretChange}
        onFocus={handleCaretChange}
        className={cn(
          "py-0.5",
          "text-center",
          "field-sizing-content",
          "outline-none",
          "bg-transparent ",
          "caret-[#005b46] tracking-wider",
          "rounded-[8px]",
          "min-w-1",
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
