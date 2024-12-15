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