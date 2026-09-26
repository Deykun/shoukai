import useOpenWithOutsideClick from "@/hooks/useOpenWithOutsideClick";
import { SyntheticEvent, useCallback, useState } from "react";
import {
  CaretPositionStatus,
  getCaretPositionStatus,
} from "../utils/getCaretPositionStatus";

type Props = {
  value: string;
  references: string[] | undefined;
};

export const useFormulaBuilderDropdown = (props: Props) => {
  const { outsideRef, isOpen, setIsOpen } = useOpenWithOutsideClick(false);
  const [caretPositionStatus, setCaretPositionStatus] =
    useState<CaretPositionStatus>({
      type: "text",
      startingPosition: 0,
    });

  const handleSelect = useCallback(
    (event: SyntheticEvent<HTMLTextAreaElement>) => {
      if (!props.references || props.references.length === 0) {
        setIsOpen(false);
        return;
      }

      const selectionStart = event.currentTarget.selectionStart;
      const caretPositionStatus = getCaretPositionStatus({
        value: props.value,
        caretPosition: selectionStart,
      });
      setCaretPositionStatus(caretPositionStatus);

      if (caretPositionStatus.type === "reference") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    },
    [props.references, props.value],
  );

  return {
    outsideRef,
    isOpen,
    setIsOpen,
    handleSelect,
    caretType: caretPositionStatus.type,
    caretStartingPosition: caretPositionStatus.startingPosition,
    caretReference:
      "reference" in caretPositionStatus ? caretPositionStatus.reference : "",
  };
};
