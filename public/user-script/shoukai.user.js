// ==UserScript==
// @name            shoukai - personalized search
// @namespace       deykun
// @author          deykun
// @version         1.1
// @include         *://*filmweb.pl*
// @include         *://*google.com*
// @include         *://*duckduckgo.com*
// @include         *://*yandex.com*
// @include         *://localhost:3001/shoukai*
// @include         *://deykun.github.io/shoukai*
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           unsafeWindow
// @grant           window.close
// @grant           window.focus
// @grant           window.onurlchange
// @run-at          document-start
// ==/UserScript==

'use strict';

const shoukaiUrl = 'https://deykun.github.io/shoukai/';

const getFromLocalStorage = (key, defaultValues = {}) => (localStorage.getItem(key)
  ? { ...defaultValues, ...JSON.parse(localStorage.getItem(key)) }
  : { ...defaultValues });

const getSourcesFromLS = () => getFromLocalStorage('shoukaiparse-units', {});

const getSettingsFromLS = () => getFromLocalStorage('shoukaiparse-state', {});

unsafeWindow.shoukaiScript = {
  version: '1.1',
  isDevMode: false,
  cache: {
    HTML: {},
    CSS: {},
    inited: false,
    status: null,
    location: location.href,
  },
  settings: getSettingsFromLS(),
  actions: {},
};

unsafeWindow.shoukaiScript.ui = {
  status: {
    type: '',
    text: '',
  },
  openedContent: '',
  eventsSubscribers: {},
};


const userScriptLogger = (params) => {
  if (params.isError) {
    const { isCritical = false, message = '', error } = params;

    if (isCritical) {
      // eslint-disable-next-line no-console
      console.error('A shoukai error (from Tampermonkey) has occurred.');
      // eslint-disable-next-line no-console
      console.error(`shoukai error: ${message}`);
      // eslint-disable-next-line no-console
      console.error(error);
    }

    if (window.shoukaiScript.isDevMode && error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
};

const domReady = (fn) => {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fn();

    return;
  }

  document.addEventListener('DOMContentLoaded', fn);
};

const initShoukai = async () => {
  const searchParams = new URL(location.href).searchParams;
  const searchKey = searchParams.get('shoukaiKey');

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
  const appendCSS = (styles, { sourceName = '' } = {}) => {
  const appendOnceSelector = sourceName ? `g-wp-css-${sourceName}`.trim() : undefined;
  if (appendOnceSelector) {
    /* Already appended */
    if (document.getElementById(appendOnceSelector)) {
      return;
    }
  }

  const style = document.createElement('style');
  if (sourceName) {
    style.setAttribute('id', appendOnceSelector);
  }

  style.innerHTML = styles;
  document.head.append(style);
};

// eslint-disable-next-line default-param-last
const render = (HTML = '', source) => {
  const id = `g-wp-html-${source}`;

  if (HTML === window.shoukaiScript.cache.HTML[id]) {
    /* Don't rerender if HTML is the same */
    return;
  }

  window.shoukaiScript.cache.HTML[id] = HTML;

  const wrapperEl = document.getElementById(id);

  if (!HTML) {
    if (wrapperEl) {
      wrapperEl.remove();
    }

    return;
  }

  if (wrapperEl) {
    wrapperEl.innerHTML = HTML;

    return;
  }

  const el = document.createElement('div');
  el.id = id;
  el.setAttribute('data-testid', id);
  el.innerHTML = HTML;

  document.body.appendChild(el);
};

const nestedSelectors = (selectors, subcontents) => {
  return subcontents.map(([subselector, content]) => {
    return `${selectors.map((selector) => `${selector} ${subselector}`).join(', ')} {
      ${content}
    }`;
  }).join(' ');
};

const addPositionRelativeIfNeeded = (el) => {
  if (!el) {
      return;
  }

  const styles = getComputedStyle(el);

  const shouldAddRelative = !styles.position || styles.position === 'static';
  if (shouldAddRelative) {
      el.style.position = 'relative';
  }
};

  const debounce = (fn, time) => {
  let timeoutHandler;

  return (...args) => {
    clearTimeout(timeoutHandler);
    timeoutHandler = setTimeout(() => {
      fn(...args);
    }, time);
  };
};

const upperCaseFirstLetter = (text) =>
  typeof text === "string" ? text.charAt(0).toUpperCase() + text.slice(1) : "";

const copyText = (text) => {
  const selBox = document.createElement("textarea");
  selBox.style.position = "fixed";
  selBox.style.left = "0";
  selBox.style.top = "0";
  selBox.style.opacity = "0";
  selBox.value = text;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand("copy");
  document.body.removeChild(selBox);
};

const openInNewTab = (url) => {
  Object.assign(document.createElement("a"), {
    target: "_blank",
    rel: "noreferrer noopener",
    href: url,
  }).click();
};

const getSafeText = (text) => {
  if (!text) {
    return "";
  }

  return text
    .replace(/\n|\r/g, " ")
    .replaceAll(`'`, `"`)
    .replaceAll(`'`, '"')
    .replace(/\s\s+/g, " ");
};

const addClass = (el, className) => el.classList.add(className);
const removeClass = (el, className) => el.classList.remove(className);

const truncateString = (text, maxLength) => {
  return typeof text === "string" && text.length > maxLength
    ? `${text.slice(0, maxLength)}...`
    : text;
};

const getDayStampFromDate = (datelike) => {
  const date = new Date(datelike);

  const year = date.getFullYear();
  // DD.MM.YYYY (month is counted from 0)
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const stampDateWithoutYear = `${`${day}`.padStart(
    2,
    "0"
  )}.${`${month}`.padStart(2, "0")}`;
  const stamp = `${stampDateWithoutYear}.${year}`;

  return stamp;
};

  /*
  https://iconmonstr.com
*/

const IconCopy = `<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" strokeLinejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 25 25">
  <path fill-rule="nonzero" d="M6 19v2c0 .621.52 1 1 1h2v-1.5H7.5V19zm7.5 3H10v-1.5h3.5zm4.5 0h-3.5v-1.5H18zm4-3h-1.5v1.5H19V22h2c.478 0 1-.379 1-1zm-1.5-1v-3.363H22V18zm0-4.363V10H22v3.637zM7.5 10v3.637H6V10zM19 6v1.5h1.5V9H22V7c0-.478-.379-1-1-1zM9 6H7c-.62 0-1 .519-1 1v2h1.5V7.5H9zm4.5 1.5H10V6h3.5zm3-1.5V3.5h-13v13H6v-1.863h1.5V18H3c-.48 0-1-.379-1-1V3c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v4.5h-3.5V6z"/>
</svg>`;

const IconCopyAlt = `<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" strokeLinejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 25 25">
  <path fill-rule="nonzero" d="M6 18H3c-.48 0-1-.379-1-1V3c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1H7c-.48 0-1-.379-1-1zM7.5 7.5v13h13v-13zm9-1.5V3.5h-13v13H6V7c0-.481.38-1 1-1z"/>
</svg>`;

const IconRemove = `<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 25 25">
  <path d="M5.662 23 .293 17.635C.098 17.44 0 17.185 0 16.928c0-.256.098-.512.293-.707L15.222 1.293c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707L12.491 21h5.514v2H5.662zm3.657-2-5.486-5.486-1.419 1.414L6.49 21h2.829zm.456-11.429-4.528 4.528 5.658 5.659 4.527-4.53-5.657-5.657z"/>
</svg>`;

const IconSearch = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
  <path d="M5 1a4 4 0 1 0 2.248 7.31l2.472 2.47a.75.75 0 1 0 1.06-1.06L8.31 7.248A4 4 0 0 0 5 1M2.5 5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0"/>
</svg>`;

  appendCSS(`
.wp-text-input-wrapper {
  display: flex;
  gap: 5px;
  position: relative;
}

.wp-text-input-wrapper input {
  width: 100%;
  padding-left: 10px;
}

.wp-text-input-wrapper label {
  position: absolute;
  top: 0;
  left: 5px;
  transform: translateY(-50%);
  background-color: var(--us-nav-item-bg);
  padding: 2px 5px;
  border-radius: 2px;
  font-size: 9px;
}
`, { sourceName: 'interface-text-input' });

const getTextInput = ({
  idInput, idButton, label, name, value = '', placeholder, isDisabled = false,
}) => {
  return `<div class="wp-text-input-wrapper">
    <input
      ${idInput ? ` id="${idInput}" ` : ''}
      type="text"
      ${name ? ` name="${name}" ` : ''}
      value="${value}"
      placeholder="${placeholder}"
      ${isDisabled ? ' disabled ' : ''}
    />
    ${label ? `<label>${label}</label>` : ''}
    <button id="${idButton}" class="us-nav-popup-button" title="Save">
      ${IconSave}
    </button>
  </div>`;
};

appendCSS(`
.wp-checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 400;
}

.wp-checkbox-wrapper input {
  margin-left: 5px;
  margin-right: 5px;
}
`, { sourceName: 'interface-value' });

const getCheckbox = ({
  idInput, classNameInput, label, name, value, isChecked = false, type = 'checkbox',
}) => {
  return `<label class="wp-checkbox-wrapper">
    <span>
      <input
        type="${type}"
        ${idInput ? ` id="${idInput}" ` : ''}
        ${classNameInput ? ` class="${classNameInput}" ` : ''}
        name="${name}"
        ${value ? `value="${value}"` : ''}
        ${isChecked ? ' checked' : ''}
      />
    </span>
    <span>${label}</span>
  </label>`;
};

const getRadiobox = (params) => {
  return getCheckbox({ ...params, type: 'radio' });
};


  if (!searchKey) {
    if (location.href.includes('localhost') || location.href.includes('deykun.github.io')) {
      const getResultsByKey = () => {
  const resultsByKey = GM_getValue("resultsByKey") || {};

  return resultsByKey;
};

unsafeWindow.shoukaiGetResultsByKey = getResultsByKey;

const resetResults = () => {
  GM_setValue("queryByPhrase", {});
  GM_setValue("resultsByKey", {});
};

unsafeWindow.shoukaiReset = resetResults;

const getQueries = () => {
  const queryByPhrase = GM_getValue("queryByPhrase") || {};

  return queryByPhrase;
};

unsafeWindow.shoukaiGetQueries = getQueries;

const getQuery = (phrase) => {
  if (!phrase) {
    return;
  }

  const queryByPhrase = GM_getValue("queryByPhrase") || {};
  const date = new Date().toString();
  const stamp = getDayStampFromDate(date);

  return queryByPhrase?.[stamp]?.[phrase.toLowerCase()];
};

unsafeWindow.shoukaiGetQuery = getQuery;

const setQuery = ({ phrase, openedTabs = [], searchKeys = [] }) => {
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
    searchKeys,
  };

  GM_setValue("queryByPhrase", queryByPhrase);
};

unsafeWindow.shoukaiSetQuery = setQuery;

      addClass(document.body, 'has-user-script');
      const scriptVersionElement = document.getElementById('shoukai-version');
      if (scriptVersionElement) {
        scriptVersionElement.innerHTML = '1.1';
      }
    }

    return;
  }

  try {
    appendCSS(`
  [data-indexed] {
    position: relative;
  }

  [data-indexed]::after {
    content: attr(data-indexed);
  }
`, { sourceName: 'parse' });

appendCSS(`
  .shoukai-index-marker,
  .shoukai-index-marker-tooltip {
    padding: 4px 8px;
    background-color: #f5f9ef;
    color: #075525;
    border-radius: 4px;
  }

  .shoukai-index-marker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    top: 5px;
    left: -5px;
    transform: translateX(-100%);
    z-index: 5;
    font-weight: bold;
    letter-spacing: 0.03em;

    svg {
      width: 15px;
      height: 15px;
      fill: currentColor;
    }
  }

  .shoukai-index-marker-tooltip {
    width: 300px;
    position: absolute;
    left: 0;
    top: calc(100% + 4px);
    opacity: 0;
    pointer-events: none;
    
    font-weight: regular;
    letter-spacing: 0;
    line-height: 1.4;

    i {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    p {
      font-size: 10px;
      margin: 5px 0 0;
    }
  }

  .shoukai-index-marker:hover {
    z-index: 50;
  }

  .shoukai-index-marker:hover .shoukai-index-marker-tooltip {
    opacity: 1;
  }
`, { sourceName: 'parse-markers' });

const addIndexedMarker = (el, { index, title, url, description }) => {
  if (!el.querySelector('.shoukai-index-marker')) {
    // addPositionRelativeIfNeeded(el);
    addClass(el, 'shoukai-index-marker-wrapper');

    const markerEl = document.createElement('span');
    markerEl.setAttribute('class', 'shoukai-index-marker');
    markerEl.innerHTML = `${IconSearch} <span>${index + 1}.</span>
      <div class="shoukai-index-marker-tooltip">
        <strong>${title}</strong>
        <i>${url}</i>
        <p>${description}</p>
      </div>
    `;
  
    el.appendChild(markerEl);
  }
};
    
    const parse = () => {
      if (location.href.includes('filmweb.pl')) {
        const parseFilmweb = () => {
  const searchPhrase = new URLSearchParams(location.href.split('#/')[1]).get('query');

  if (searchPhrase) {
    // 
  }
}

        parseFilmweb();
      }

      if (location.href.includes('duckduckgo.com')) {
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

        parseDuckDuckGo();
      }

      if (location.href.includes('google.com')) {
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

    if (searchKey && resultsParsed.length > 0) {
      const results = resultsParsed.map(({ url, title, description }) => ({ source: 'google', url, title, description }));

      saveResults(searchKey, results);
    }
  }
}

        parseGoogle();
      }

      if (location.href.includes('yandex.com')) {
        const parseYandex = () => {
  const searchPhrase = document.querySelector('form[role="search"] textarea')?.value;
  if (searchPhrase) {
    const keysWords = searchPhrase.split(' ');

    const limitByDomain = keysWords.find((keyWord) => keyWord.startsWith('site')).replace('site:', '') || '';

    console.log(limitByDomain);

    const resultsParsed = Array.from(document.querySelectorAll((`#search-result li:has([href*="${limitByDomain}"])`))).slice(0, 50).map((el) => {
      const url = el.querySelector(`[href*="${limitByDomain}"]`)?.href;
      const elTitle = Array.from(el.querySelectorAll('h2, h3')).find((elToCheck) => elToCheck?.innerText);
      const title = elTitle?.innerText?.replace(/\n|\r/g, '')?.trim() || '';

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

        parseYandex();
      }
    };

    parse();

    appendCSS(`
`, { sourceName: 'render-app-copy' });

const getAppCopy = () => {
  return `<div class="us-nav-button-wrapper">
    <button id="copy-code" class="us-nav-button" title="Copy this page">${IconCopy}</button>
    <button id="copy-code-all" class="us-nav-button" title="Copy all">${IconCopyAlt}</button>
    <button id="remove-all" class="us-nav-button" title="Clear">${IconRemove}</button>
  </div>`;
};

const getSourceTextToCopy = (source, value) => {
  return `
  urls.unitBySource['${source}'] = [
    ${(value || window.parsedDE[source]).filter((item) => item.thumbnailUrl).map((item) => {
      const description = item.detailsUrl ? [item.description, getDetails(item.detailsUrl)].filter(Boolean).join(' |||| ') : item.description;

      if (item.detailsUrl) {
        console.log(item.detailsUrl);
        console.log(getDetails(item.detailsUrl));
      }

      const descriptionToCopy = (description || '').substring(0, 3000);

      return `{
        locationName: '${item.locationName}',
        locationUrl: '${item.locationUrl.replace('?only=details', '')}',
        thumbnailUrl: ${item.thumbnailUrl ? `'${item.thumbnailUrl}'` : 'undefined'},
        description: '${descriptionToCopy}',
        type: [${(item.type || []).map((v) => `'${v}'`).join(',')}],
        source: '${item.source}',
        sourceTitle: '${item.sourceTitle}',
      }`;
    }).join(', ')}
  ]; 
`;
}

window.shoukaiScript.ui.eventsSubscribers.copyCode = {
  selector: '#copy-code',
  handleClick: () => {
    const source = location.href.split('#')[0];

    if (window.parsedDE[source]) {
      console.log('Copied!');

      copyText(getSourceTextToCopy(source));
    }
  },
};

window.shoukaiScript.ui.eventsSubscribers.copyCodeAll = {
  selector: '#copy-code-all',
  handleClick: () => {
    const unitsBySource = getSourcesFromLS();
    const indexedSources = Object.keys(unitsBySource).sort((a, b) => a.localeCompare(b));

    if (indexedSources.length > 0) {
      const textToCopy = indexedSources.map((source) => getSourceTextToCopy(source, unitsBySource[source])).join(' ');
      
      console.log('Copied!');
      copyText(textToCopy);
    }
  },
};

window.shoukaiScript.ui.eventsSubscribers.removeAll = {
  selector: '#remove-all',
  handleClick: () => {
    // localStorage.removeItem('shoukaiparse-units');
    localStorage.clear();
    console.log('Removed!');
  },
};

    appendCSS(`
  :root {
    --us-nav-item-size: 48px;
    --us-nav-item-bg: #fff;
    --us-nav-item-text-strong: #fff;
    --us-nav-item-text: #59636e;
    --us-nav-item-text-hover: 0969da;
    --us-nav-item-border: #d1d0e0b3;
    --us-nav-item-radius: 5px;
  }

  .us-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    right: 30px;
    height: var(--us-nav-item-size);
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.08));
  }

  .us-nav > * + * {
    margin-left: -1px;
  }

  .us-nav > :first-child {
    border-top-left-radius: var(--us-nav-item-radius);
  }

  .us-nav > :last-child {
    border-top-right-radius: var(--us-nav-item-radius);
  }

  .us-nav-status,
  .us-nav-button-wrapper {
    height: var(--us-nav-item-size);
    min-width: var(--us-nav-item-size);
    line-height: var(--us-nav-item-size);
    border: 1px solid var(--us-nav-item-border);
    border-bottom-width: 0px;
    background: var(--us-nav-item-bg);
  }

  .us-nav-button-wrapper {
    position: relative;
  }

  .us-nav-button {
    background: transparent;
    border: none;
    padding: 0;
    color: var(--us-nav-item-text);
    width: var(--us-nav-item-size);
    transition: 0.3s ease-in-out;
    box-sizing: border-box;
  }

  .us-nav-button:hover {
    color: var(--us-nav-item-text-hover);
  }

  .us-nav-button--active {
    color: var(--us-nav-item-text-strong);
  }

  .us-nav-button svg {
    fill: currentColor;
    padding: 25%;
    height: var(--us-nav-item-size);
    width: var(--us-nav-item-size);
    line-height: var(--us-nav-item-size);
    box-sizing: border-box;
  }

  .us-nav-popup {
    position: absolute;
    right: 0;
    bottom: calc(100% + 10px);
    width: 300px;
    color: var(--us-nav-item-text-strong);
    border: 1px solid var(--us-nav-item-border);
    border-radius: var(--us-nav-item-radius);
    border-bottom-right-radius: 0;
    background-color: var(--us-nav-item-bg);
  }

  .us-nav-popup-content {
    display: flex;
    flex-flow: column;
    gap: 18px;
    max-height: calc(100vh - 60px);
    overflow: auto;
    padding: 10px;
    padding-top: 0;
    font-size: 12px;
    line-height: 1.3;
    text-align: left;
  }

  .us-nav-popup-title {
    position: sticky;
    top: 0px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 10px;
    padding-bottom: 5px;
    font-size: 16px;
    background-color: var(--us-nav-item-bg);
  }

  .us-nav-popup-title svg {
    fill: currentColor;
    height: 16px;
    width: 16px;
  }

  .us-nav-popup h3 {
    font-size: 13px;
    margin-bottom: 8px;
  }

  .us-nav-popup ul {
    display: flex;
    flex-flow: column;
    gap: 8px;
    list-style: none;
  }

  .us-nav-popup .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .us-nav-popup::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: calc((var(--us-nav-item-size) / 2) - 5px);
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: var(--us-nav-item-border);
  }

  .us-nav-popup-button {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border-radius: 3px;
    font-size: 14px;
    letter-spacing: 0.04em;
    text-decoration: none;
    background: none;
    border: none;
    color: var(--bgColor-default);
    background-color: var(--fgColor-success);
  }

  .us-nav-popup-button:hover {
    text-decoration: none;
  }

  .us-nav-popup-button svg {
    fill: currentColor;
    width: 18px;
    height: 18px;
  }
`, { sourceName: 'render-app' });

const renderApp = () => {
  const content = window.shoukaiScript.ui.openedContent;

  render(`<aside class="us-nav" data-active="${content}">
    ${getAppCopy()}
  </aside>`, 'wp-app');
};

// window.shoukaiScript.ui.eventsSubscribers.content = {
//   selector: '.us-nav-button',
//   handleClick: (_, calledByElement) => {
//     if (calledByElement) {
//       const content = calledByElement.getAttribute('data-content');
//       const isClose = !content || content === window.wp.ui.openedContent;

//       if (isClose) {
//         window.wp.ui.openedContent = '';
//       } else {
//         window.wp.ui.openedContent = content;
//       }
//     }

//     renderApp();
//   },
// };



    renderApp();

    try {
  document.body.addEventListener('click', (event) => {
    const handlerData = Object.values(window.shoukaiScript.ui.eventsSubscribers).find(({ selector }) => {
      /* It checks max 4 nodes, while .closest() would look for all the nodes to body */
      const matchedHandlerData = [
        event.target,
        event.target?.parentElement,
        event.target?.parentElement?.parentElement,
        event.target?.parentElement?.parentElement?.parentElement,
      ].filter(Boolean).find((el) => el.matches(selector));

      return Boolean(matchedHandlerData);
    });

    if (handlerData) {
      const { selector, handleClick, shouldPreventDefault = true } = handlerData;

      if (shouldPreventDefault) {
        event.preventDefault();
      }

      const calledByElement = event.target.closest(selector);

      handleClick(event, calledByElement);
    }
  });
} catch (error) {
  userScriptLogger({
    isError: true, isCritical: true, message: 'Click detect failed', error,
  });
}


    const debouncedRefresh = debounce(() => {
      parse();

      const didLocationChange = location.href !== window.shoukaiScript.cache.location;
      if (didLocationChange) {
        renderApp();
      }
    }, 500);

    const observer = new MutationObserver(debouncedRefresh);
    const config = {
      childList: true,
      subtree: true,
    };
    observer.observe(document.body, config);
  } catch (error) {
    userScriptLogger({
      isError: true, isCritical: true, message: 'initShoukai() failed', error,
    });

    throw error;
  }
};

domReady(initShoukai);
