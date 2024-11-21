export const rerenderSearch = () => {
  const googleResultsByKey = GM_getValue('googleResultsByPhrase') || {};
  const results = googleResultsByKey[searchKey] || [];

  if (results.length > 0) {
    if (unsafeWindow.setResults) {
      unsafeWindow.setResults(results);
    }
  }
};

export const renderSearch = () => {
  console.log('RENDER');
  rerenderSearch();

  console.log('sdffsdsfd');
  unsafeWindow.spesRenderSearch = rerenderSearch;
  unsafeWindow.ss = 3;
};


