import useOpenWithOutsideClick from "@/hooks/useOpenWithOutsideClick";
import { SyntheticEvent, useCallback } from "react";
import { REFERENCE_START } from "../constants";

type Props = {
  value: string;
  trigger?: string;
  references: string[] | undefined;
};

export const useFormulaBuilderDropdown = (props: Props) => {
  const { outsideRef, isOpen, setIsOpen } = useOpenWithOutsideClick(false);

  const handleSelect = useCallback(
    (event: SyntheticEvent<HTMLTextAreaElement>) => {
      if (!props.references || props.references.length === 0) {
        setIsOpen(false);
        return;
      }

      const trigger = props.trigger ?? REFERENCE_START;
      const selectionStart = event.currentTarget.selectionStart;
      const substringToCheckForTrigger = props.value.slice(
        selectionStart - trigger.length,
        selectionStart,
      );

      if (substringToCheckForTrigger === trigger) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    },
    [props.trigger, props.value],
  );

  return {
    outsideRef,
    isOpen,
    setIsOpen,
    handleSelect,
  };
};
