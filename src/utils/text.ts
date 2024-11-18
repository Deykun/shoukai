export const capitalize = (text: string | undefined) => (text ? text[0].toUpperCase() + text.slice(1) : text);

export const lowercaseFirstLetter = (text: string | undefined) => (text ? text[0].toLowerCase() + text.slice(1) : text);

export const copyText = (text: string) => {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = text;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
};
  