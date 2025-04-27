const saveResults = (searchKey, results) => {
  const date = (new Date()).toString();
  const resultsByKey = GM_getValue('resultsByKey') || {};

  GM_setValue('resultsByKey', { 
    ...resultsByKey,
    [searchKey]: {
      date,
      results,
    },
  });

  window.location.href = `${shoukaiUrl}reindex?searchKey=${searchKey}`;
}