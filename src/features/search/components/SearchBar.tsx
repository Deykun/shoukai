import { memo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import useEffectChange from '@/hooks/useEffectChange';

import useSearchStore, { setSearchPhrase } from '@/features/search/stores/searchStore';
import { getSearchParamsFromData } from '@/features/search/utils/url';


const SearchBar = () => {
  const searchPhrase = useSearchStore(state => state.searchPhrase);
  const updateFilterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [inputValue, setInputValue] = useState(searchPhrase);

  const { t } = useTranslation();

  useEffectChange(() => {
    if (updateFilterTimeoutRef.current) {
      clearTimeout(updateFilterTimeoutRef.current);
      updateFilterTimeoutRef.current = null;
    }

    if (searchPhrase !== inputValue) {
      updateFilterTimeoutRef.current = setTimeout(() => {
        setSearchPhrase(inputValue);

        const searchParams = getSearchParamsFromData({
          searchPhrase: inputValue,
        })

        window.history.replaceState(undefined, '', `${location.pathname}${searchParams}`);

        if (updateFilterTimeoutRef.current) {
          clearTimeout(updateFilterTimeoutRef.current);
          updateFilterTimeoutRef.current = null;
        }
      }, 500);
    }
  }, [inputValue]);

  useEffectChange(() => {
    if (updateFilterTimeoutRef.current) {
      clearTimeout(updateFilterTimeoutRef.current);
      updateFilterTimeoutRef.current = null;
    }

    setInputValue(searchPhrase);
  }, [searchPhrase])

  return (
    <section>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value || '')}
        className={clsx(
          'block w-full  rounded-[24px] py-4 px-6 shadow-md',
          'border-[#f5f9ef] border',
          'caret-[#82a849] max-w-[400px] mx-auto tracking-wide font-[500] text-[18px]',
          'outline-none hover:bordedr-[#f5f9ef] hover:shadow-lg',
          'duration-500',
        )}
        placeholder={t('search.inputPlaceholder')}
      />
    </section>
  );
}

export default memo(SearchBar);
