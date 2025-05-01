import { useTranslation } from "react-i18next";

import { LOCAL_STORAGE } from "@/constants";
import useAppStore, { closeModal } from "@/stores/appStore";

import { SUPPORTED_LANGS } from "@/i18n";

import IconSearchInput from "@/components/Icons/IconSearchInput";
import IconSearchWeb from "@/components/Icons/IconSearchWeb";
import IconSearchResults from "@/components/Icons/IconSearchResults";
import IconClose from "@/components/Icons/IconClose";

import ButtonIcon from "@/components/UI/ButtonIcon";
import ButtonText from "@/components/UI/ButtonText";
import Logo from "@/components/Logo/Logo";

const OverviewModal = () => {
  const isOpen = useAppStore(
    (state) => state.modal.type === "documentationOverview"
  );

  const { t, i18n } = useTranslation();

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
      
      <Logo />
      <p className="opacity-50 text-sm text-justify hyphens-auto">3 stages of search</p>
      <h2 className="flex gap-3 items-center font-[600]">
        <IconSearchInput className="size-10 text-primary-contrast" />
        <span>Input analysis and intent detection</span>
      </h2>
      <p className="opacity-50 text-sm text-justify hyphens-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quam dignissimos itaque?
      </p>
      <br />
      <h2 className="flex gap-3 items-center font-[600]">
        <IconSearchWeb className="size-10 text-primary-contrast" />
        <span>Search engine engagement</span>
      </h2>
      <br />
      <h2 className="flex gap-3 items-center font-[600]">
        <IconSearchResults className="size-10 text-primary-contrast" />
        <span>Result evaluation</span>
      </h2>
    </article>
  );
};

export default OverviewModal;
