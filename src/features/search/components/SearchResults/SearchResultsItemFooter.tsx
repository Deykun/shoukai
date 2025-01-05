import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { userRecipeByKey } from "@/constants";
import { SearchResultEvaluated } from "@/types";

import IconLogo from "@/components/Icons/IconLogo";

import ButtonIcon from "@/components/UI/ButtonIcon";

type Props = {
  isOpen: boolean;
  result: SearchResultEvaluated;
};

const SearchResultsItemFooter = ({ isOpen, result }: Props) => {
  const { score, source, recipeId } = result;

  const { t, i18n } = useTranslation();

  const recipeName =
    userRecipeByKey[recipeId]?.byLang?.[i18n.language]?.name ||
    userRecipeByKey[recipeId].name ||
    "";

  return (
    <footer
      className={clsx(
        "overflow-hidden duration-300",
        "text-xs",
        "flex justify-end items-center gap-4",
        "font-[600]",
        {
          "mt-2 -mb-2 max-h-10 opacity-100": isOpen,
          "-mt-2 max-h-0 opacity-0": !isOpen,
        }
      )}
    >
      <ButtonIcon
        size="small"
        wrapperClassName="-mr-1"
        label={t(`search.${source}`)}
        labelPosition="left"
      >
        <IconLogo id={source} />
      </ButtonIcon>
      <span>{(100 * (score / 1)).toFixed(1)}%</span>
      <span className="inline-flex items-center gap-2">
        {userRecipeByKey[recipeId]?.svgIcon && (
          <span
            className="[&>svg]:size-4 text-[#075525] inline-flex items-center"
            dangerouslySetInnerHTML={{
              __html: userRecipeByKey[recipeId].svgIcon || "",
            }}
          />
        )}
        <span className="text-xs">{recipeName}</span>
      </span>
    </footer>
  );
};

export default SearchResultsItemFooter;
