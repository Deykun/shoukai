import { useTranslation } from "react-i18next";

import { LOCAL_STORAGE } from "@/constants";
import useAppStore, { closeModal } from "@/stores/appStore";

import { SUPPORTED_LANGS } from "@/i18n";

import IconFlag from "@/components/Icons/IconFlag";
import IconClose from "@/components/Icons/IconClose";

import ButtonIcon from "@/components/UI/ButtonIcon";
import ButtonText from "@/components/UI/ButtonText";

const LanguageModal = () => {
  const isOpen = useAppStore((state) => state.modal.type === "language");

  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem(LOCAL_STORAGE.SHOUKAI_USER_LANG, lang);
    closeModal();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <article className="max-w-screen-md mx-auto p-4 flex flex-col gap-5 animate-fade-in">
      <header className="flex gap-5 items-center">
        <ButtonIcon
          wrapperClassName="ml-auto"
          label={t("main.close")}
          labelPosition="bottom"
          onClick={closeModal}
        >
          <IconClose />
        </ButtonIcon>
      </header>
      <div className="grid grid-cols-2 gap-4">
        {SUPPORTED_LANGS.map((lang) => (
          <ButtonText
            wrapperClassName="block w-full"
            className="block w-full"
            size="large"
            key={lang}
            onClick={() => changeLanguage(lang)}
            isActive={i18n.language === lang}
          >
            <IconFlag code={lang} />
            <span>{t("main.currentLanguage", { lng: lang })}</span>
          </ButtonText>
        ))}
      </div>
    </article>
  );
};

export default LanguageModal;
