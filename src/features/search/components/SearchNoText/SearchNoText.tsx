import { useTranslation } from "react-i18next";

import ButtonText from "@/components/UI/ButtonText";

import IconSearchCamera from "@/components/Icons/IconSearchCamera";
import IconSearchMap from "@/components/Icons/IconSearchMap";

import useSearchStore from "@/features/search/stores/searchStore";
import { getDefaultSearchUrl } from "@/features/logic-runner/parsers/openers/actions/getDefaultSearchUrl";

const SearchNoText = () => {
  const searchPhrase = useSearchStore((state) => state.searchPhrase);
  const metaResults = useSearchStore((state) => state.meta.results);

  const { t } = useTranslation();

  if (!searchPhrase) {
    return null;
  }

  return (
    <section className="flex flex-row justify-end gap-2">
      <ButtonText
        href={getDefaultSearchUrl("search-image", searchPhrase)}
        target="_blank"
        rel="noreferrer noopener"
        title="Google Image"
        isPromoted={metaResults.some(({ tag }) => tag === "image")}
      >
        <IconSearchCamera />
        <span>{t("search.typeImage")}</span>
      </ButtonText>
      <ButtonText
        href={getDefaultSearchUrl("search-location", searchPhrase)}
        target="_blank"
        rel="noreferrer noopener"
        title="Google Maps"
        isPromoted={metaResults.some(({ tag }) => tag === "location")}
      >
        <IconSearchMap />
        <span>{t("search.typeMap")}</span>
      </ButtonText>
    </section>
  );
};

export default SearchNoText;
