import { KeyboardEvent } from "react";

export const resizeFormulaBuilder = (
  event: KeyboardEvent<HTMLTextAreaElement>,
) => {
  // It collapses it when line is removed
  event.currentTarget.style.height = "1px";
  // It adjust size instantly (textarea by default resizes when line is filled not when we create it with enter)
  event.currentTarget.style.height = event.currentTarget.scrollHeight + "px";
};
