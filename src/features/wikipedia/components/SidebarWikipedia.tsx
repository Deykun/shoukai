import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import IconWikipedia from "@/components/Icons/IconWikipedia";

import useSearchStore from "@/features/search/stores/searchStore";
import { getWikipediaResult } from "@/features/wikipedia/api/wikipedia";


const MANY_RESULTS_API_RESPONSE: {
  [lang: string]: string[];
} = {
  en: ["Wikimedia disambiguation page"],
  pl: [
    "strona ujednoznaczniająca w projekcie Wikimedia",
    "strona ujednoznaczniająca",
    "strona ujednoznaczniająca Wikipedii",
  ],
};

const SidebarWikipedia = () => {
  const searchPhrase = useSearchStore((state) => state.searchPhrase);
  const { t, i18n } = useTranslation();

  const {
    isLoading,
    // error,
    data,
  } = useQuery({
    queryFn: () => getWikipediaResult(searchPhrase, i18n.language),
    queryKey: [searchPhrase, i18n.language],
  });

  if (!searchPhrase) {
    return null;
  }

  const wikipediaUrl = `https://${i18n.language}.wikipedia.org/wiki/${encodeURI(
    searchPhrase
  )}`;

  return (
    <section className="bg-[#f5f9ef] p-4 rounded-md flex flex-col gap-2">
      <h3 className="text-[20px] mb-3">
        <a
          href={wikipediaUrl}
          className="flex gap-2 items-center"
          title="Wikipedia"
          target="_blank"
          rel="noreferrer noopener"
        >
          <IconWikipedia className="size-8 p-1 bg-white rounded-[4px]" />
          <span>{data?.title || searchPhrase}</span>
        </a>
      </h3>
      {data?.description && (
        <p className="text-sm">
          {MANY_RESULTS_API_RESPONSE[i18n.language].includes(data?.description)
            ? t("wikipedia.manyResults")
            : data?.description}
        </p>
      )}
      <footer className="text-right">
        {!isLoading && !data && "?"}{" "}
        <a
          href={wikipediaUrl}
          className="text-sm underline tracking-wide"
          target="_blank"
          rel="noreferrer noopener"
        >
          Wikipedia
        </a>
      </footer>
      {data?.thumbnail && (
        <img
          src={data?.thumbnail}
          style={data?.thumbnailStyle}
          className="rounded-md w-full bg-[#d1d7cd]"
        />
      )}
    </section>
  );
};

export default SidebarWikipedia;
