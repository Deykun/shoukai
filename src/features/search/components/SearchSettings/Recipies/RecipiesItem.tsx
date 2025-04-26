import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UserSearchRecipie } from "@/types";
import { recipeByKey } from "@/constants";

import { toggleActiveForRecipie } from "@/features/search/stores/searchSettingsStore";

import ButtonText from "@/components/UI/ButtonText";
import Modal from "@/components/UI/Modal";
import IconSearch from "@/components/Icons/IconSearch";
import ButtonIcon from "@/components/UI/ButtonIcon";
import IconSearchSettings from "@/components/Icons/IconSearchSettings";

type Props = {
  userRecipie: UserSearchRecipie;
};

const RecipiesItem = ({ userRecipie }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const { id, isActive } = userRecipie;

  const recipie = recipeByKey[id];

  if (!recipie) {
    return null;
  }

  const { name, description, svgIcon, byLang } = recipie;

  return (
    <li className="flex flex-col gap-2">
      <header className="flex gap-3 items-center">
        {svgIcon && (
          <span
            className="[&>svg]:size-7 text-[#075525] inline-flex items-center"
            dangerouslySetInnerHTML={{ __html: svgIcon }}
          />
        )}
        <div className="flex flex-col gap-1">
          <h4>{byLang?.[i18n.language]?.name || name}</h4>
          <p className="text-xs opacity-75">
            {byLang?.[i18n.language]?.description || description}
          </p>
        </div>
      </header>
      <div>
        <ButtonText
          isActive={isActive}
          size="small"
          onClick={() => toggleActiveForRecipie(id)}
        >
          <IconSearch />
          <span>{isActive ? "Active" : "Inactive"}</span>
        </ButtonText>
        <ButtonIcon
          onClick={() => setIsOpen(true)}
          label={t("search.settings")}
          labelPosition="bottom"
        >
          <IconSearchSettings />
        </ButtonIcon>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        Modal
      </Modal>
    </li>
  );
};

export default RecipiesItem;
