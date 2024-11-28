import clsx from 'clsx';
import { useTranslation } from "react-i18next";

import { SearchResult } from '@/types';

type Props = {
  isOpen: boolean,
  result: SearchResult,
}

const SearchResultsItemFooter = ({ isOpen, result }: Props) => {
  const { source } = result;

  const { t } = useTranslation();
 
  return (
    <footer className={clsx(
      'overflow-hidden duration-300',
      'text-right text-xs',
      {
        'mt-2 max-h-10 opacity-100': isOpen,
        '-mt-2 max-h-0 opacity-0': !isOpen,
      },
    )}>
      {t('search.source')}: <span className="text-[#476814]">{source}</span>
    </footer>
  );
}

export default SearchResultsItemFooter;
