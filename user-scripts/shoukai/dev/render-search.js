export const getResultsByKey = () => {
  const resultsByKey = GM_getValue('resultsByKey') || {};

  return resultsByKey;
};

export const resetResults = () => {
 GM_setValue('resultsByKey', {});
};

unsafeWindow.shoukaiGetResultsByKey = getResultsByKey;
unsafeWindow.shoukaiReset = resetResults;


