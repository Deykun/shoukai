import { MouseEvent } from "react";

// Clicking the padding/gaps around the chunks behaves like clicking the end
// of the formula.
export const focusFormulaBuilder = (
  eventOrElement: MouseEvent<HTMLDivElement> | HTMLDivElement,
  caretPosition?: number,
) => {
  let element: HTMLDivElement;

  if (eventOrElement instanceof HTMLDivElement) {
    element = eventOrElement;
  } else {
    if (eventOrElement.target !== eventOrElement.currentTarget) {
      return;
    }

    element = eventOrElement.currentTarget;
  }

  const textareaElement = element.querySelector("textarea");

  if (textareaElement) {
    textareaElement.focus();
    // Defaults to the end of the formula
    const position = caretPosition ?? textareaElement.value.length;

    textareaElement.setSelectionRange(position, position);
  }
};
