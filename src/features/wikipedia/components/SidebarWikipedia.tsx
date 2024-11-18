import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import IconWikipedia from '@/components/Icons/IconWikipedia';

import useSearchStore from '@/features/search/stores/searchStore';

type WikipediaResult = {
  title: string,
  thumbnail?: string,
  description?: string,
  thumbnailStyle?: React.CSSProperties
}

const MANY_RESULTS_API_RESPONSE: {
  [lang: string]: string,
} = {
  en: 'Wikimedia disambiguation page',
  pl: 'strona ujednoznaczniająca',
};

const getWikipediaResult = async (searchPhrase: string, lang = 'en'): Promise<null | WikipediaResult> => {
  if (!searchPhrase) {
    return null;
  }

  // `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=600&titles=`,
  try {
    // https://www.mediawiki.org/wiki/API:Page_info_in_search_results
    const response = await fetch(
      `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURI(searchPhrase)}&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=600&origin=*&format=json&formatversion=2`,
      {
        method: "GET",
      }
    );
    const rawData = await response.json();

    const result = rawData?.query?.pages[0];

    const hasResult = result.missing !== true;
    // && (result?.title || '').toLowerCase() === searchPhrase.toLowerCase();
  
    if (hasResult) {
      console.log('hasResult', hasResult);
      console.log('dd', result?.thumbnail?.source || result?.terms?.description[0]);

      const thumbnail = result?.thumbnail?.source;
      const description = result?.terms?.description[0];
      
      if (thumbnail || description) {
        return {
          title: result.title,
          thumbnail: result?.thumbnail?.source, // .width nd .height are available
          thumbnailStyle: { aspectRatio: `${result?.thumbnail?.width || 1}/${result?.thumbnail?.height || 1}` },
          description: description === MANY_RESULTS_API_RESPONSE[lang] ? '' : description,
        }
      }
    }

    return null;
  } catch {
  }

  return null;
};

const SidebarWikipedia = () => {
  const searchPhrase = useSearchStore(state => state.searchPhrase);
  const { t, i18n } = useTranslation();

  const {
    // isLoading,
    // error,
    data,
  } = useQuery({
    queryFn: () => getWikipediaResult(searchPhrase, i18n.language),
    queryKey: [searchPhrase, i18n.language],
  });

  if (!searchPhrase) {
    return null;
  }

  const wikipediaUrl = `https://${i18n.language}.wikipedia.org/wiki/${encodeURI(searchPhrase)}`;

  return (
    <section className="bg-[#f5f9ef] p-4 rounded-md flex flex-col gap-2">
      <h3 className="text-[20px]">
        <a href={wikipediaUrl} className="flex gap-2 items-center" title="Wikipedia">
          <IconWikipedia className="size-5" />
          <span>
            {data?.title || searchPhrase}
          </span>
        </a>
      </h3>
      {data?.description && <p className="text-sm">
        {data?.description}
      </p>}
      <footer className="text-right">
        <a href={wikipediaUrl} className="text-sm underline tracking-wide">Wikipedia</a>
      </footer>
      {data?.thumbnail && <img src={data?.thumbnail} style={data?.thumbnailStyle} className="rounded-md w-full bg-primary" />}
    </section>
  );
};

export default SidebarWikipedia;
