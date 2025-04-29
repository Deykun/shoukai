import { useTranslation } from "react-i18next";

import {
  getGoogleSearchUrl,
  getDuckDuckGoSearchUrl,
  getYandexSearchUrl,
  getBingSearchUrl,
} from "@/features/search/utils/search";

import ButtonIcon from "@/components/UI/ButtonIcon";

import IconDuckDuckGo from "@/components/Icons/IconDuckDuckGo";
import IconGoogle from "@/components/Icons/IconGoogle";
import IconYandex from "@/components/Icons/IconYandex";
import IconBing from "@/components/Icons/IconBing";

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
    <section className="sticky top-3 flex flex-row justify-end items-center gap-1">
      <span className="text-xs opacity-50">{t("search.openWith")}</span>
      <ButtonIcon
        href={getBingSearchUrl(searchPhrase)}
        {...linkParams}
        label={t("search.bing")}
        labelPosition="bottom"
      >
        {" "}
        <IconBing />
      </ButtonIcon>
      <ButtonIcon
        href={getDuckDuckGoSearchUrl(searchPhrase)}
        {...linkParams}
        label={t("search.duckduckgo")}
        labelPosition="bottom"
      >
        {" "}
        <IconDuckDuckGo />
      </ButtonIcon>
      <ButtonIcon
        href={getGoogleSearchUrl(searchPhrase)}
        {...linkParams}
        label={t("search.google")}
        labelPosition="bottom"
      >
        {" "}
        <IconGoogle />
      </ButtonIcon>
      <ButtonIcon
        href={getYandexSearchUrl(searchPhrase)}
        label={t("search.yandex")}
        labelPosition="bottom"
      >
        {" "}
        <IconYandex />
      </ButtonIcon>
    </section>
  );
};

export default GoToSearchEngine;
