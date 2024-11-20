const parseGoogle = () => {
  const searchPhrase = document.querySelector('form[action="/search"] textarea').value;
  if (searchPhrase) {
    const keysWords = searchPhrase.split(' ');

    const limitByDomain = keysWords.find((keyWord) => keyWord.startsWith('site')).replace('site:', '') || '';
  
    const resultsParsed = Array.from(document.querySelectorAll((`[href*="${limitByDomain}"]`))).slice(0, 50).map((el) => {
      const url = el.href;
      const elTitle = Array.from(el.querySelectorAll('h2, h3')).find((elToCheck) => elToCheck?.innerText);
      const title = elTitle?.innerText?.replace(/\n|\r/g, '')?.trim() || '';

      if (!title) {
        return undefined;
      }
  
      const elTitleWrapper = elTitle?.parentNode?.parentNode?.parentNode;
      const elDescription = el?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode;
      const cardHeaderText = elTitleWrapper?.innerText?.replace(/\n|\r/g, '')?.trim() || '';
      const cardText = elDescription?.innerText?.replace(/\n|\r/g, '')?.trim() || '';

      const description = truncateString(cardText.replace(cardHeaderText, '').trim(), 120);
  
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
  
    console.log(resultsParsed);
  }
}
