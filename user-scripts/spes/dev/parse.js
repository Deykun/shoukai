appendCSS(`
  [data-indexed] {
    position: relative;
  }

  [data-indexed]::after {
    content: attr(data-indexed);
  }
`, { sourceName: 'parse' });
