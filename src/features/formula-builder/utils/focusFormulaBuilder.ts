import { MouseEvent } from "react";

// Clicking the padding/gaps around the chunks behaves like clicking the end
// of the formula.
export const focusFormulaBuilder = (event: MouseEvent<HTMLDivElement>) => {
  if (event.target !== event.currentTarget) {
    return;
  }

  const textareaElement = event.currentTarget.querySelector("textarea");

  if (textareaElement) {
    textareaElement.focus();
    // Set's focus at the end
    textareaElement.setSelectionRange(
      textareaElement.value.length,
      textareaElement.value.length,
    );
  }
};
