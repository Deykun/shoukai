export const getResultsByKey = () => {
  const resultsByKey = GM_getValue("resultsByKey") || {};

  return resultsByKey;
};

unsafeWindow.shoukaiGetResultsByKey = getResultsByKey;

export const resetResults = () => {
  GM_setValue("queryByStampByPhrase", {});
  GM_setValue("resultsByKey", {});
};

unsafeWindow.shoukaiReset = resetResults;

const shoukaiRemoveHistoryItem = ({ stamp, phrase } = {}) => {
  const queryByStampByPhrase = GM_getValue("queryByStampByPhrase") || {};

  const query = queryByStampByPhrase?.[stamp]?.[phrase.toLowerCase()];
  if (query) {
    const { searchKeys = [] } = query;

    if (searchKeys.length > 0) {
      const resultsByKey = GM_getValue("resultsByKey") || {};

      searchKeys.forEach((key) => {
        resultsByKey[key] = undefined;
      });

      GM_setValue("resultsByKey", resultsByKey);
    }

    queryByStampByPhrase[stamp][phrase.toLowerCase()] = undefined;

    GM_setValue("queryByStampByPhrase", queryByStampByPhrase);
  }
};

unsafeWindow.shoukaiRemoveHistoryItem = shoukaiRemoveHistoryItem;

export const getQueries = () => {
  const queryByStampByPhrase = GM_getValue("queryByStampByPhrase") || {};

  return queryByStampByPhrase;
};

unsafeWindow.shoukaiGetQueries = getQueries;

export const getQuery = (phrase) => {
  if (!phrase) {
    return;
  }

  const queryByStampByPhrase = GM_getValue("queryByStampByPhrase") || {};
  const date = new Date().toString();
  const stamp = getDayStampFromDate(date);

  return queryByStampByPhrase?.[stamp]?.[phrase.toLowerCase()];
};

unsafeWindow.shoukaiGetQuery = getQuery;

export const setQuery = ({ phrase, openedTabs = [], searchKeys = [] }) => {
  if (!phrase) {
    return;
  }

  const queryByStampByPhrase = GM_getValue("queryByStampByPhrase") || {};
  const date = new Date().toString();
  const stamp = getDayStampFromDate(date);

  if (!queryByStampByPhrase[stamp]) {
    queryByStampByPhrase[stamp] = {};
  }

  queryByStampByPhrase[stamp][phrase.toLowerCase()] = {
    phrase,
    date,
    openedTabs,
    searchKeys,
  };

  GM_setValue("queryByStampByPhrase", queryByStampByPhrase);
};

unsafeWindow.shoukaiSetQuery = setQuery;
