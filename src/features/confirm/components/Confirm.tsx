import useOpenWithOutsideClick from "@/hooks/useOpenWithOutsideClick";

import useConfirmStore, { CONFIRM_STATE } from "../stores/useConfirmStore";
import { useEffect } from "react";
import PanelFlow from "@/features/logic/components/panel/PanelFlow";
import ButtonText from "@/components/UI/ButtonText";
import IconClose from "@/components/Icons/IconClose";
import { useTranslation } from "react-i18next";
import IconCheck from "@/components/Icons/IconCheck";

export const Confirm = () => {
  const { setInsideRef, isOpen, setIsOpen } = useOpenWithOutsideClick(false);
  const { state, title, content, onCancel, onConfirm } = useConfirmStore();
  const { t } = useTranslation();

  useEffect(() => {
    setIsOpen(state === CONFIRM_STATE.ACTIVE);
  }, [state]);

  useEffect(() => {
    if (!isOpen) {
      onCancel();
    }
  }, [isOpen]);

  return (
    <PanelFlow insideRef={setInsideRef} isOpen={isOpen}>
      <h1 className="text-lg text-primary-contrast font-[600]">{title}</h1>
      <p className="text-[#979f8a]">{content}</p>
      <div className="flex gap-5 justify-end mt-2">
        <ButtonText onClick={onCancel} size="large">
          <IconClose />
          <span>{t("main.close")}</span>
        </ButtonText>
        <ButtonText onClick={onConfirm} isActive size="large">
          <IconCheck />
          <span>{t("main.confirm")}</span>
        </ButtonText>
      </div>
    </PanelFlow>
  );
};
