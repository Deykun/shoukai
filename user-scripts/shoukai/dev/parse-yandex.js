const parseYandex = () => {
  const searchPhrase = document.querySelector('form[role="search"] textarea')?.value;
  console.log('searchPhrase', searchPhrase);
  if (searchPhrase) {
    const keysWords = searchPhrase.split(' ');

    const limitByDomain = keysWords.find((keyWord) => keyWord.startsWith('site')).replace('site:', '') || '';

    console.log(limitByDomain);

    const resultsParsed = Array.from(document.querySelectorAll((`#search-result li:has([href*="${limitByDomain}"])`))).slice(0, 50).map((el) => {
      const url = el.querySelector(`[href*="${limitByDomain}"]`)?.href;
      const elTitle = Array.from(el.querySelectorAll('h2, h3')).find((elToCheck) => elToCheck?.innerText);
      const title = elTitle?.innerText?.replace(/\n|\r/g, '')?.trim() || '';

      console.log({
        url,
        title,
      })

      if (!title) {
        return undefined;
      }
  

      const description = truncateString(el.querySelector('.OrganicTextContentSpan')?.innerText?.trim(), 120) || '';

      return {
        el,
        url,
        title,
        description,
      }
    }).filter(Boolean).slice(0, 10);

    resultsParsed.forEach(({ el, url, title, description }, index) => {
      addIndexedMarker(el, { index, url, title, description });
    });

    if (searchKey && resultsParsed.length > 0) {
      const results = resultsParsed.map(({ url, title, description }) => ({ source: 'yandex', url, title, description }));

      saveResults(searchKey, results);
    }
  }
}
