export const getResultsByKey = () => {
  const resultsByKey = GM_getValue('resultsByKey') || {};

  return resultsByKey;
};

unsafeWindow.shoukaiGetResultsByKey = getResultsByKey;


