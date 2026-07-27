import { useTranslation } from "react-i18next";

import useAppStore, { closeModal } from "@/stores/appStore";
import FlowLogic from "../components/flow/FlowLogic";
import IconClose from "@/components/Icons/IconClose";
import ButtonIcon from "@/components/UI/ButtonIcon";

const ModalLogic = () => {
  const isOpen = useAppStore((state) => state.modal.type === "logic");

  const { t, i18n } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <article className="animate-fade-in bg-white relative">
      <FlowLogic />
      <ButtonIcon
        wrapperClassName="absolute top-5 right-5 z-1"
        label={t("main.close")}
        labelPosition="bottom"
        onClick={closeModal}
      >
        <IconClose />
      </ButtonIcon>
    </article>
  );
};

export default ModalLogic;
