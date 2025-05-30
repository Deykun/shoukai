import { useState } from "react";
import { useTranslation } from "react-i18next";

import { SearchResultEvaluated } from "@/types";

import IconAdjustAlt from "@/components/Icons/IconAdjustAlt";

import ButtonIcon from "@/components/UI/ButtonIcon";

import SearchResultsItemFooter from "./SearchResultsItemFooter";

type Props = {
  result: SearchResultEvaluated;
};

const SearchResultsItem = ({ result }: Props) => {
  const { title, url, description, recipe } = result;

  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <li className="flex flex-col gap-1 bg-[#f5f9ef] p-4 pt-2 rounded-md relative">
      <h3 className="text-lg font-[600] text-black pr-6 line-clamp-2">
        <a href={url} target="_blank">
          {title}
        </a>
      </h3>
      <a
        className="text-xs text-[#075525] truncate text-ellipsis"
        href={url}
        target="_blank"
      >
        {url}
      </a>
      <p className="text-xs text-[#979f8a]">{description}</p>
      <ButtonIcon
        size="small"
        wrapperClassName="absolute top-2 right-2"
        onClick={() => setIsOpen(!isOpen)}
        isActive={isOpen}
        label={t("main.readMore")}
        labelPosition="left"
      >
        <IconAdjustAlt />
      </ButtonIcon>
      <SearchResultsItemFooter result={result} isOpen={isOpen} />
    </li>
  );
};

export default SearchResultsItem;
