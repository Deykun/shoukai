import { useTranslation } from "react-i18next";

import { getGoogleImagesSearchUrl, getGoogleMapsSearchUrl } from '@/features/search/utils/search';

import ButtonText from "@/components/UI/ButtonText";

import IconSearchCamera from "@/components/Icons/IconSearchCamera";
import IconSearchMap from "@/components/Icons/IconSearchMap";

import useSearchStore from "@/features/search/stores/searchStore";

const SearchNoText = () => {
  const searchPhrase = useSearchStore((state) => state.searchPhrase);
  const metaInput = useSearchStore(state => state.meta.input);
  const metaResults = useSearchStore(state => state.meta.results);

  const { t } = useTranslation();

  if (!searchPhrase) {
    return null;
  }

  return (
    <section className="flex flex-row justify-end gap-2">
      <ButtonText
        href={getGoogleImagesSearchUrl(searchPhrase)}
        target="_blank"
        rel="noreferrer noopener"
        title="Google Image"
        isPromoted={metaInput.includes('image')}
      >
        <IconSearchCamera />
        <span>{t("search.typeImage")}</span>
      </ButtonText>
      <ButtonText
        href={getGoogleMapsSearchUrl(searchPhrase)}
        target="_blank"
        rel="noreferrer noopener"
        title="Google Maps"
        isPromoted={metaResults.includes('location')}
      >
        <IconSearchMap />
        <span>{t("search.typeMap")}</span>
      </ButtonText>
    </section>
  );
};

export default SearchNoText;
