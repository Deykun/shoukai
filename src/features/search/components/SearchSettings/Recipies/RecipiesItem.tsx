import { useTranslation } from "react-i18next";
import { UserSearchRecipie } from "@/types";
import { recipeByKey } from "@/constants";

type Props = {
  userRecipie: UserSearchRecipie;
};

const RecipiesItem = ({ userRecipie }: Props) => {
  const { i18n } = useTranslation();

  const { id } = userRecipie;

  const recipie = recipeByKey[id];

  if (!recipie) {
    return null;
  }

  const { name, svgIcon, byLang } = recipie;

  return (
    <li className="flex gap-3">
      {svgIcon && (
        <span
          className="[&>svg]:size-4 text-[#075525] inline-flex items-center"
          dangerouslySetInnerHTML={{ __html: svgIcon }}
        />
      )}
      <span>{byLang?.[i18n.language]?.name || name}</span>
    </li>
  );
};

export default RecipiesItem;
