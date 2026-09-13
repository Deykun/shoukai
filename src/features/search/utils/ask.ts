export const getChatGPTAskUrl = (phrase: string, key?: string) =>
  `https://chatgpt.com/?q=${encodeURI(`${phrase}`)}${
    key ? `&shoukaiKey=${key}` : ""
  }`;
