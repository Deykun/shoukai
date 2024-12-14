const parseDuckDuckGo = () => {
  const searchPhrase = document.getElementById('search_form_input').value;
  if (searchPhrase) {
    const keysWords = searchPhrase.split(' ');

    const limitByDomain = keysWords.find((keyWord) => keyWord.startsWith('site')).replace('site:', '') || '';
  
    const resultsParsed = Array.from(document.querySelectorAll((`[href*="${limitByDomain}"]`))).slice(0, 50).map((el) => {
      const url = el.href;

      const elTitle = el.closest('h2');
      const title = elTitle?.innerText?.replace(/\n|\r/g, '')?.trim() || '';

      if (!title) {
        return undefined;
      }
  
      const elDescription = elTitle?.parentNode?.nextElementSibling;
      const cardText = elDescription?.innerText?.replace(/\n|\r/g, '')?.trim() || '';

      const description = truncateString(cardText, 120);
  
      return {
        el,
        elTitle,
        elDescription,
        url,
        title,
        description,
      }
    }).filter(Boolean).slice(0, 10);
  
    resultsParsed.forEach(({ el, url, title, description }, index) => {
      addIndexedMarker(el, { index, url, title, description });
    });

    if (searchKey && resultsParsed.length > 0) {
      const results = resultsParsed.map(({ url, title, description }) => ({ source: 'duckduckgo', url, title, description }));

      saveResults(searchKey, results);
    }
  }
}
