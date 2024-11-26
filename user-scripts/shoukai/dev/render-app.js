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

export const renderApp = () => {
  const content = window.WikiParser.ui.openedContent;

  render(`<aside class="us-nav" data-active="${content}">
    ${getAppCopy()}
  </aside>`, 'wp-app');
};

// window.WikiParser.ui.eventsSubscribers.content = {
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

