import useOpenWithOutsideClick from "@/hooks/useOpenWithOutsideClick";
import { SyntheticEvent, useCallback, useState } from "react";
import {
  CaretPositionStatus,
  getCaretPositionStatus,
} from "../utils/getCaretPositionStatus";

type Props = {
  value: string;
  references: string[] | undefined;
  onChange: (value: string) => void;
};

export const useFormulaBuilderDropdown = (props: Props) => {
  const { outsideRef, isOpen, setIsOpen } = useOpenWithOutsideClick(false);
  const [caretPositionStatus, setCaretPositionStatus] =
    useState<CaretPositionStatus>({
      type: "text",
      startingPosition: 0,
    });

  const updateDropdownState = useCallback(
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

  const handleReferencePicked = useCallback(
    (reference: string) => {
      const startingPosition = caretPositionStatus.startingPosition;
      const before = props.value.slice(0, startingPosition);
      const replacedLength =
        caretPositionStatus.type === "reference"
          ? caretPositionStatus.text.length
          : 0;
      const after = props.value.slice(startingPosition + replacedLength);

      console.log(caretPositionStatus);

      props.onChange(`${before}${reference}${after}`);
    },
    [caretPositionStatus, props.value, props.onChange],
  );

  return {
    outsideRef,
    isOpen,
    setIsOpen,
    handleSelect: updateDropdownState,
    handleFocus: updateDropdownState,
    handleReferencePicked,
    caretType: caretPositionStatus.type,
    caretStartingPosition: caretPositionStatus.startingPosition,
    caretReference:
      "text" in caretPositionStatus ? caretPositionStatus.text : "",
  };
};
