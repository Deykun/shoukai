export const getResultsByKey = () => {
  const resultsByKey = GM_getValue("resultsByKey") || {};

  return resultsByKey;
};

unsafeWindow.shoukaiGetResultsByKey = getResultsByKey;

export const resetResults = () => {
  GM_setValue("queryByPhrase", {});
  GM_setValue("resultsByKey", {});
};

unsafeWindow.shoukaiReset = resetResults;

export const getQueries = () => {
  const queryByPhrase = GM_getValue("queryByPhrase") || {};

  return queryByPhrase;
};

unsafeWindow.shoukaiGetQueries = getQueries;

export const getQuery = (phrase) => {
  if (!phrase) {
    return;
  }

  const queryByPhrase = GM_getValue("queryByPhrase") || {};
  const date = new Date().toString();
  const stamp = getDayStampFromDate(date);

  return queryByPhrase?.[stamp]?.[phrase.toLowerCase()];
};

unsafeWindow.shoukaiGetQuery = getQuery;

export const setQuery = (phrase, openedTabs = []) => {
  if (!phrase) {
    return;
  }

  const queryByPhrase = GM_getValue("queryByPhrase") || {};
  const date = new Date().toString();
  const stamp = getDayStampFromDate(date);

  if (!queryByPhrase[stamp]) {
    queryByPhrase[stamp] = {};
  }

  queryByPhrase[stamp][phrase.toLowerCase()] = {
    phrase,
    date,
    openedTabs,
  };

  GM_setValue("queryByPhrase", queryByPhrase);
};

unsafeWindow.shoukaiSetQuery = setQuery;
