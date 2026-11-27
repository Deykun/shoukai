import { Reference } from "@/features/logic/constants";
import { REFERENCE_START, REFERENCE_END } from "../../constants";

export const getReferenceWithoutBrackets = (reference: Reference): string => {
  return reference.slice(REFERENCE_START.length, -REFERENCE_END.length);
};
