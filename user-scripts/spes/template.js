// ==UserScript==
// @name            Spes - personalized search
// @namespace       deykun
// @author          deykun
// @version         SCRIPT_VERSION
// @include         *://*google.com*
// @include         *://*duckduckgo.com*
// @include         *://*yandex.com*
// @include         *://localhost:3001/spes*
// @grant           none
// @run-at          document-start
// ==/UserScript==

'use strict';

/* import @/constants.js */

const userScriptLogger = (params) => {
  if (params.isError) {
    const { isCritical = false, message = '', error } = params;

    if (isCritical) {
      // eslint-disable-next-line no-console
      console.error('A Spes error (from Tampermonkey) has occurred.');
      // eslint-disable-next-line no-console
      console.error(`Spes error: ${message}`);
      // eslint-disable-next-line no-console
      console.error(error);
    }

    if (window.WikiParser.isDevMode && error) {
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

const initSpes = async () => {
  // TODO: check if needed
  // if (window.WikiParser.cache.inited) {
  //   return;
  // }

  // window.WikiParser.cache.inited = true;

  console.log('TEST');

  try {
    /* import @/db.js */
    /* import @/dom.js */
    /* import @/helpers.js */
    /* import @/icons.js */
    /* import @/interface.js */


    // parse();

    /* import @/render-app-copy.js */
    /* import @/render-app.js */

    renderApp();

    /* import @/subscribers.js */

    const debouncedRefresh = debounce(() => {
      const didLocationChange = location.href !== window.WikiParser.cache.location;
      if (didLocationChange) {
        window.WikiParser.cache.location = location.href;

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
      isError: true, isCritical: true, message: 'initSpes() failed', error,
    });

    throw error;
  }
};

domReady(initSpes);
