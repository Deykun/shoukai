import { getReferencesInString } from "../../../../formula-builder/utils/references/getReferencesInString";
import { getReferenceWithoutBrackets } from "@/features/formula-builder/utils/references/getReferenceWithoutBrackets";
import { useRunnerContextStore } from "../../useRunnerContextStore";
import { isKeyOf } from "@/utils/object";

export const resolveReferences = (template: string): string => {
  const references = getReferencesInString(template);
  if (references.length === 0) {
    return template;
  }

  let response = template;

  const store = useRunnerContextStore.getState();

  references.forEach((reference) => {
    const referenceWithoutBrackets = getReferenceWithoutBrackets(reference);
    const [variablePath, ...modifiers] = referenceWithoutBrackets.split("|");

    if (isKeyOf(store.global, variablePath)) {
      const value = store.global[variablePath];

      if (typeof value === "string" || typeof value === "number") {
        let valueToUse = String(value);

        if (modifiers.includes("uppercase")) {
          valueToUse = valueToUse.toUpperCase();
        }

        if (modifiers.includes("onlyNumber")) {
          // First number in text, "126,21" -> "126.21"
          const [firstNumber = ""] = valueToUse.match(/\d+(?:[.,]\d+)?/) ?? [];
          valueToUse = firstNumber.replace(",", ".");
        }

        response = response.replaceAll(reference, valueToUse);
      } else {
        response = response.replaceAll(reference, "");
      }
    }
  });

  // getReferenceWithoutBrackets();

  return response;
};
