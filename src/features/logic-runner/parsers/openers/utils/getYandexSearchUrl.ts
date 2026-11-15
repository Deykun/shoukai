export const getYandexSearchUrl = (phrase: string) =>
  `https://yandex.com/search/?text=${encodeURI(phrase)}`;
