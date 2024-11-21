import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import IconSearch from '@/components/Icons/IconSearch';

import useEffectChange from "@/hooks/useEffectChange";

import useSearchStore, {
  setSearchPhrase,
} from "@/features/search/stores/searchStore";
import { getSearchParamsFromData } from "@/features/search/utils/url";

const SearchBar = () => {
  const searchPhrase = useSearchStore((state) => state.searchPhrase);
  const [inputValue, setInputValue] = useState(searchPhrase);

  const { t } = useTranslation();

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchPhrase(inputValue);

    const searchParams = getSearchParamsFromData({
      searchPhrase: inputValue,
    });

    window.history.replaceState(
      undefined,
      "",
      `${location.pathname}${searchParams}`
    );
  };

  useEffectChange(() => {
    setInputValue(searchPhrase);
  }, [searchPhrase]);

  return (
    <form
      className={clsx(
        'relative',
        'flex items-center w-full',
        ' rounded-[24px] shadow-md',
        'border-[#f5f9ef] border',
        'max-w-[400px] mx-auto font-[500] text-[18px]',
        'hover:bordedr-[#f5f9ef] hover:shadow-lg',
        'duration-500',
      )}
      onSubmit={handleSubmit}
    >
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value || "")}
        placeholder={t("search.inputPlaceholder")}
        className={clsx(
          'w-full py-4 px-6 pr-12 outline-none',
          'bg-transparent rounded-[24px]',
          'caret-[#82a849] tracking-wider',
        )}
        autoFocus
      />
      <button
        className={clsx(
          'absolute top-1/2 right-4 -translate-y-1/2 -translate-x-1/2',
          'flex-shrink-0 group',
        )}
      >
        <IconSearch className="fill-[#82a849] group-hover:fill-[#476814] duration-300 size-5" />
      </button>
    </form>
  );
};

export default memo(SearchBar);
