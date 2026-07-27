import { useTranslation } from "react-i18next";

import useAppStore, { closeModal } from "@/stores/appStore";

import IconClose from "@/components/Icons/IconClose";
import IconGithub from "@/components/Icons/IconGithub";
import IconSearchInput from "@/components/Icons/IconSearchInput";
import IconSearchWeb from "@/components/Icons/IconSearchWeb";
import IconSearchResults from "@/components/Icons/IconSearchResults";

import ButtonIcon from "@/components/UI/ButtonIcon";
import ButtonText from "@/components/UI/ButtonText";
import Logo from "@/components/Logo/Logo";

const ModalLogic = () => {
  const isOpen = useAppStore(
    (state) => state.modal.type === "logic"
  );

  const { t, i18n } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <article className="max-w-screen-md mx-auto p-4 flex flex-col gap-5 animate-fade-in">
     dsds
    </article>
  );
};

export default ModalLogic;
