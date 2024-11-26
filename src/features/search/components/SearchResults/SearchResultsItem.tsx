import { SearchResult } from '@/types';

type Props = {
  result: SearchResult,
}

const SearchResultsItem = ({ result: { title, url, description} }: Props) => {
  return (
    <li className="flex flex-col gap-1 bg-[#f5f9ef] p-4 rounded-md">
      <h3 className="text-lg font-[600] text-black"><a href={url} target="_blank">{title}</a></h3>
      <a className="text-xs text-[#476814] truncate text-ellipsis" href={url} target="_blank">{url}</a>
      <p className="text-sm">{description}</p>
    </li>
  );
}

export default SearchResultsItem;
