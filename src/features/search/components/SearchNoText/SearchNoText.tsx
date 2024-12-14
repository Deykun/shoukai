import { useTranslation } from "react-i18next";

import ButtonText from "@/components/UI/ButtonText";

import IconSearchCamera from "@/components/Icons/IconSearchCamera";
import IconSearchMap from "@/components/Icons/IconSearchMap";

import useSearchStore from "@/features/search/stores/searchStore";

const SearchNoText = () => {
  const searchPhrase = useSearchStore((state) => state.searchPhrase);

  const { t } = useTranslation();

  if (!searchPhrase) {
    return null;
  }

  return (
    <section className="flex flex-row justify-end gap-2">
      <ButtonText
        href={`https://www.google.com/search?q=${encodeURI(
          searchPhrase
        )}&tbm=isch`}
        target="_blank"
        rel="noreferrer noopener"
        title="Google Image"
      >
        <IconSearchCamera />
        <span>{t("search.typeImage")}</span>
      </ButtonText>
      <ButtonText
        href={`https://www.google.com/maps/search/${encodeURI(searchPhrase)}`}
        target="_blank"
        rel="noreferrer noopener"
        title="Google Maps"
      >
        <IconSearchMap />
        <span>{t("search.typeMap")}</span>
      </ButtonText>
    </section>
  );
};

export default SearchNoText;
