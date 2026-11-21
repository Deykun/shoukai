import { escapeRegExp } from "lodash";
import {
  REFERENCE_END,
  REFERENCE_START,
} from "@/features/formula-builder/constants";
import { Reference } from "@/features/logic/constants";

const REFERENCE_REGEX = new RegExp(
  `${escapeRegExp(REFERENCE_START)}\\S+?${escapeRegExp(REFERENCE_END)}`,
  "g",
);

// "a {{phrase}} b {{nodes.x.1}}" -> ["{{phrase}}", "{{nodes.x.1}}"]
export const getReferencesInString = (template: string): Reference[] => {
  // REFERENCE_REGEX guarantees the {{...}} shape
  return (template.match(REFERENCE_REGEX) ?? []) as Reference[];
};
