import { useTranslation } from "react-i18next";

import useAppStore, { toggleLanguageModal } from "@/stores/appStore";

import IconFlag from "@/components/Icons/IconFlag";

import ButtonText from "@/components/UI/ButtonText";

const Language = () => {
  const isOpen = useAppStore((state) => state.modal.type === "language");

  const { i18n } = useTranslation();

  return (
    <div className="flex gap-1">
      <h3 className="sr-only">Language</h3>
      <ButtonText onClick={toggleLanguageModal} isActive={isOpen}>
        <IconFlag code={i18n.language} />
        <span className="uppercase">{i18n.language}</span>
      </ButtonText>
    </div>
  );
};

export default Language;
