import { useTranslation } from "react-i18next";

import useAppStore, { closeModal } from "@/stores/appStore";
import IconClose from "@/components/Icons/IconClose";
import ButtonIcon from "@/components/UI/ButtonIcon";
import FlowLogicWrapper from "../components/flow/FlowLogicWrapper";
import { cn } from "@/utils/tailwind";

const ModalLogic = () => {
  const isOpen = useAppStore((state) => state.modal.type === "logic");

  const { t, i18n } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <article className="animate-fade-in bg-white relative">
      <FlowLogicWrapper />

      <div
        className={cn(
          "fixed top-4 right-0 z-10",
          "flow-ui-border",
          "bg-[#f5f9ef] rounded-l-xl",
          "p-4",
          "translate-x-0 starting:translate-x-full",
          "transition-transform duration-500 delay-500 ease-in-out",
        )}
      >
        <ButtonIcon
          label={t("main.close")}
          labelPosition="bottom"
          onClick={closeModal}
        >
          <IconClose />
        </ButtonIcon>
      </div>
    </article>
  );
};

export default ModalLogic;
