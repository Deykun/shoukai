type SupportedParams = {
  searchPhrase: string,
}

export const getInitDataFromSearchParams = () => {
  let init: SupportedParams = {
    searchPhrase: '',
  };

  const searchParams = new URL(location.href).searchParams;

  if (searchParams.has('s')) {
    init.searchPhrase = decodeURI(searchParams.get('s') || '');
  }

  return init;
};

export const getSearchParamsFromData = ({ searchPhrase }: SupportedParams) => {
  const searchParts = [];

  if (searchPhrase) {
    searchParts.push(`s=${encodeURI(searchPhrase)}`);
  }

  return `?${searchParts.join('&')}`;
};
