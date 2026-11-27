import { MaybeReference, ReferenceConfig } from "@/features/logic/constants";

type Params = {
  referenceToCheck: MaybeReference;
  references: ReferenceConfig[];
};

export const getIsValidReference = ({
  referenceToCheck,
  references,
}: Params): boolean => {
  // References can have | modifiers
  const rawReferenceToCheck = referenceToCheck?.includes("|")
    ? `${referenceToCheck.split("|").at(0)}}}`
    : referenceToCheck;

  return references.some(({ value }) => value === rawReferenceToCheck);
};
