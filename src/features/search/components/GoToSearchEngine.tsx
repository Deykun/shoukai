import { useTranslation } from "react-i18next";

import ButtonIcon from "@/components/UI/ButtonIcon";

import IconDuckDuckGo from "@/components/Icons/IconDuckDuckGo";
import IconGoogle from "@/components/Icons/IconGoogle";
import IconYandex from "@/components/Icons/IconYandex";

import useSearchStore from "@/features/search/stores/searchStore";

const linkParams = {
  target: "_blank",
  rel: "noreferrer noopener",
};

const GoToSearchEngine = () => {
  const searchPhrase = useSearchStore((state) => state.searchPhrase);

  const { t } = useTranslation();

  if (!searchPhrase) {
    return null;
  }

  return (
    <section className="flex flex-row justify-end items-center gap-4">
      <span className="text-xs opacity-50">{t('search.openWith')}</span>
      <ButtonIcon
        href={`https://www.google.com/search?q=${encodeURI(searchPhrase)}`}
        {...linkParams}
        label="Google"
        labelPosition="bottom"
      >
        {" "}
        <IconGoogle />
      </ButtonIcon>
      <ButtonIcon
        href={`https://duckduckgo.com/?q=${encodeURI(searchPhrase)}`}
        {...linkParams}
        label="DuckDuckGo"
        labelPosition="bottom"
      >
        {" "}
        <IconDuckDuckGo />
      </ButtonIcon>
      <ButtonIcon
        href={`https://yandex.com/search/?text=${encodeURI(searchPhrase)}`}
        {...linkParams}
        label="Yandex"
        labelPosition="bottom"
      >
        {" "}
        <IconYandex />
      </ButtonIcon>
    </section>
  );
};

export default GoToSearchEngine;
