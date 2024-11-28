import { useTranslation } from "react-i18next";

import ButtonText from "@/components/UI/ButtonText";

import IconSearchImage from "@/components/Icons/IconSearchImage";
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
        <IconSearchImage className="size-6" />
        <span>{t("search.typeImage")}</span>
      </ButtonText>
      <ButtonText
        href={`https://www.google.com/maps/search/${encodeURI(searchPhrase)}`}
        target="_blank"
        rel="noreferrer noopener"
        title="Google Maps"
      >
        <IconSearchMap className="size-6" />
        <span>{t("search.typeMap")}</span>
      </ButtonText>
    </section>
  );
};

export default SearchNoText;
