import { useTranslation } from 'react-i18next';

import useSearchStore from "@/features/search/stores/searchStore";

import "./Map.scss";

const Map = () => {
  const searchPhrase = useSearchStore((state) => state.searchPhrase);
  const metaResults = useSearchStore((state) => state.meta.results);
  const { i18n } = useTranslation();


  if (!metaResults.includes("city")) {
    return null;
  }

  // https://www.maps.ie/create-google-map/
  return (
    <section className="bg-[#f5f9ef] overflow-hidden rounded-md p-1">
      <iframe
        className="rounded-[4px] map-iframe"
        width="100%"
        height="200"
        frameBorder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src={`https://maps.google.com/maps?width=100%25&height=200&hl=en&q=${encodeURI(searchPhrase)}&t=&z=11&ie=UTF8&iwloc=B&output=embed&lang=${i18n.language}`}
      />
    </section>
  );
};

export default Map;
