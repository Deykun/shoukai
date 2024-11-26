export const openInNewTab = (url: string) => {
  Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noreferrer noopener',
      href: url,
  }).click();
}
