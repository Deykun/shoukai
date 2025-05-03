import { useTranslation } from "react-i18next";

import {
  supportedSearchEngines,
  supportedSearchEnginesParsers,
} from "@/constants";
import IconLogo from "@/components/Icons/IconLogo";
import IconSearchResults from "@/components/Icons/IconSearchResults";

import ButtonIcon from "@/components/UI/ButtonIcon";
import { useState } from "react";

type Props = {
  className?: string;
  name: string;
  value?: string;
};

const SearchEnginePicker = ({
  className,
  name,
  value: initValue = "",
}: Props) => {
  const [value, setValue] = useState(initValue);

  const { t } = useTranslation();

  return (
    <div className={className}>
      <input name={name} value={value} type="hidden" />
      <ButtonIcon
        size="large"
        onClick={() => setValue("")}
        label={t("search.defaultSearch")}
        labelPosition="bottom"
        isActive={value === ""}
      >
        <IconSearchResults />
      </ButtonIcon>
      {supportedSearchEngines.map((searchEngine) => (
        <ButtonIcon
          key={searchEngine}
          size="large"
          onClick={() => setValue(searchEngine)}
          label={t(`search.${searchEngine}`)}
          labelPosition="bottom"
          isDisabled={!supportedSearchEnginesParsers.includes(searchEngine)}
          isActive={value === searchEngine}
        >
          <IconLogo id={searchEngine} />
        </ButtonIcon>
      ))}
    </div>
  );
};

export default SearchEnginePicker;
