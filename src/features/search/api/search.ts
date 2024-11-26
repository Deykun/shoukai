const getSimpleHashFromString = (text: string) => {
  const intHash = text.split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);

  return Math.abs(intHash).toString(16);
}

export const getSearchKey = (phrase: string) => {
  return getSimpleHashFromString(phrase);
};
