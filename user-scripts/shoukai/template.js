// ==UserScript==
// @name            shoukai - personalized search
// @namespace       deykun
// @author          deykun
// @version         SCRIPT_VERSION
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

/* import @/constants.js */

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

  /* import @/db.js */
  /* import @/dom.js */
  /* import @/helpers.js */
  /* import @/icons.js */
  /* import @/interface.js */

  if (!searchKey) {
    if (location.href.includes('localhost') || location.href.includes('deykun.github.io')) {
      /* import @/render-search.js */
      addClass(document.body, 'has-user-script');
      const scriptVersionElement = document.getElementById('shoukai-version');
      if (scriptVersionElement) {
        scriptVersionElement.innerHTML = 'SCRIPT_VERSION';
      }
    }

    return;
  }

  try {
    /* import @/parse.js */
    
    const parse = () => {
      if (location.href.includes('filmweb.pl')) {
        /* import @/parse-filmweb.js */
        parseFilmweb();
      }

      if (location.href.includes('duckduckgo.com')) {
        /* import @/parse-duckduckgo.js */
        parseDuckDuckGo();
      }

      if (location.href.includes('google.com')) {
        /* import @/parse-google.js */
        parseGoogle();
      }

      if (location.href.includes('yandex.com')) {
        /* import @/parse-yandex.js */
        parseYandex();
      }
    };

    parse();

    /* import @/render-app-copy.js */
    /* import @/render-app.js */

    renderApp();

    /* import @/subscribers.js */

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
