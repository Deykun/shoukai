import { useTranslation } from 'react-i18next';

import useSearchStore from '@/features/search/stores/searchStore';

const SearchResultsSummary = () => {  
  const { t } = useTranslation();

  const searchPhrase = useSearchStore(state => state.searchPhrase);
  // TODO: use for count
  const results = useSearchStore(state => state.searchPhrase);

  if (!searchPhrase) {
    return null;
  }

  return (
    <p className="text-sm">
      “<span className="tracking-wide font-[500]">{searchPhrase}</span>” - {t('search.resultsFound', { postProcess: 'interval', count: searchPhrase.length })}
    </p>
  )
}

export default SearchResultsSummary;
