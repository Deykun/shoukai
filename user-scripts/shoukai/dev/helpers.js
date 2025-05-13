export const debounce = (fn, time) => {
  let timeoutHandler;

  return (...args) => {
    clearTimeout(timeoutHandler);
    timeoutHandler = setTimeout(() => {
      fn(...args);
    }, time);
  };
};

export const upperCaseFirstLetter = (text) =>
  typeof text === "string" ? text.charAt(0).toUpperCase() + text.slice(1) : "";

export const copyText = (text) => {
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

export const openInNewTab = (url) => {
  Object.assign(document.createElement("a"), {
    target: "_blank",
    rel: "noreferrer noopener",
    href: url,
  }).click();
};

export const getSafeText = (text) => {
  if (!text) {
    return "";
  }

  return text
    .replace(/\n|\r/g, " ")
    .replaceAll(`'`, `"`)
    .replaceAll(`'`, '"')
    .replace(/\s\s+/g, " ");
};

export const addClass = (el, className) => el.classList.add(className);
export const removeClass = (el, className) => el.classList.remove(className);

const truncateString = (text, maxLength) => {
  return typeof text === "string" && text.length > maxLength
    ? `${text.slice(0, maxLength)}...`
    : text;
};

export const getDayStampFromDate = (datelike) => {
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
