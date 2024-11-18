import { useTranslation } from 'react-i18next';

import IconDuckDuckGo from '@/components/Icons/IconDuckDuckGo';
import IconGoogle from '@/components/Icons/IconGoogle';
import IconYandex from '@/components/Icons/IconYandex';

import useSearchStore from '@/features/search/stores/searchStore';

const linkParams = { className: 'bg-[#f7f7f7] hover:bg-[#f5f9ef] hover:text-[#476814] p-2 rounded-md duration-300', target: '_blank', rel: 'noreferrer noopener' };

const GoToSearchEngine = () => {  
  const { t } = useTranslation();

  const searchPhrase = useSearchStore(state => state.searchPhrase);

  if (!searchPhrase) {
    return null;
  }
  // ${encodeURI(searchPhrase)}`;
  return (
    <section className="flex flex-row justify-end gap-4">
      <a href={`https://www.google.com/search?q=${encodeURI(searchPhrase)}`} {...linkParams} title="Google"> <IconGoogle className="size-10" /></a>
      <a href={`https://duckduckgo.com/?q=${encodeURI(searchPhrase)}`} {...linkParams} title="DuckDuckGo"> <IconDuckDuckGo className="size-10" /></a>
      <a href={`https://yandex.com/search/?text=${encodeURI(searchPhrase)}`} {...linkParams} title="Yandex"> <IconYandex className="size-10" /></a>
    </section>
  )
}

export default GoToSearchEngine;
