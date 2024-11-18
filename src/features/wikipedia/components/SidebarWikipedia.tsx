import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import IconLoader from "@/components/Icons/IconLoader";
import IconWikipedia from "@/components/Icons/IconWikipedia";

import Image from "@/components/Image/Image";

import useSearchStore from "@/features/search/stores/searchStore";
import { MANY_RESULTS_API_RESPONSE } from "@/features/wikipedia/api/constants";
import { getWikipediaResult } from "@/features/wikipedia/api/wikipedia";

import { useMemo } from "react";

const SidebarWikipedia = () => {
  const searchPhrase = useSearchStore((state) => state.searchPhrase);
  const { t, i18n } = useTranslation();

  const wikipediSearchPhrase = useMemo(() => {
    const normalizedPhrase = searchPhrase.split("site:")[0].trim();

    if (normalizedPhrase.length < 4) {
      return "";
    }

    return normalizedPhrase;
  }, [searchPhrase]);

  const {
    isLoading,
    // error,
    data,
  } = useQuery({
    queryFn: () => getWikipediaResult(wikipediSearchPhrase, i18n.language),
    queryKey: [wikipediSearchPhrase, i18n.language],
  });

  if (!wikipediSearchPhrase) {
    return null;
  }

  const wikipediaUrl = `https://${i18n.language}.wikipedia.org/wiki/${encodeURI(
    data?.title || wikipediSearchPhrase
  )}`;

  return (
    <section className="bg-[#f5f9ef] p-4 rounded-md flex flex-col gap-2">
      <footer className="flex flex-row items-center">
        <a
          href={wikipediaUrl}
          className="inline-flex gap-1 items-center text-sm font-[500] tracking-wide text-[#476814]"
          target="_blank"
          rel="noreferrer noopener"
        >
          {!isLoading && !data && <span className="text-[10px]">?</span>}
          <IconWikipedia className="inline-bock size-6" />
          <span>Wikipedia</span>
        </a>

        {isLoading && <IconLoader className="size-3 ml-auto fill-[#476814]" />}
      </footer>
      <h3 className="text-[18px] font-[600]">
        <a
          href={wikipediaUrl}
          className="flex gap-2 items-center hover:text-[#476814] duration-300 leading-6"
          title="Wikipedia"
          target="_blank"
          rel="noreferrer noopener"
        >
          {data?.title || wikipediSearchPhrase}
        </a>
      </h3>
      {data?.description && (
        <p className="text-sm line-clamp-6">
          {MANY_RESULTS_API_RESPONSE[i18n.language].includes(data?.description)
            ? t("wikipedia.manyResults")
            : data?.description}
        </p>
      )}
      {data?.thumbnail && (
        <a
          href={wikipediaUrl}
          className="block"
          title="Wikipedia"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image
            src={data?.thumbnail}
            style={data?.thumbnailStyle}
            className="rounded-md w-full bg-[#d1d7cd] contrast-100 saturate-100 hover:contrast-[1.1] hover:saturate-[1.1] duration-300"
          />
        </a>
      )}
    </section>
  );
};

export default SidebarWikipedia;
