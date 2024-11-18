import IconDuckDuckGo from '@/components/Icons/IconDuckDuckGo';
import IconGoogle from '@/components/Icons/IconGoogle';
import IconYandex from '@/components/Icons/IconYandex';

import useSearchStore from '@/features/search/stores/searchStore';

const linkParams = { className: 'bg-[#f7f7f7] text-[#6f6f6f] hover:bg-[#f5f9ef] hover:text-[#476814] p-2 rounded-md duration-300', target: '_blank', rel: 'noreferrer noopener' };

const GoToSearchEngine = () => {
  const searchPhrase = useSearchStore(state => state.searchPhrase);

  if (!searchPhrase) {
    return null;
  }

  return (
    <section className="flex flex-row justify-end gap-4">
      <span className="text-sm opacity-50">Direct:</span>
      <a href={`https://www.google.com/search?q=${encodeURI(searchPhrase)}`} {...linkParams} title="Google"> <IconGoogle className="size-7" /></a>
      <a href={`https://duckduckgo.com/?q=${encodeURI(searchPhrase)}`} {...linkParams} title="DuckDuckGo"> <IconDuckDuckGo className="size-7" /></a>
      <a href={`https://yandex.com/search/?text=${encodeURI(searchPhrase)}`} {...linkParams} title="Yandex"> <IconYandex className="size-7" /></a>
    </section>
  )
}

export default GoToSearchEngine;
