export const getClaudeSearchUrl = (phrase: string) =>
  `https://claude.ai/new?q=${encodeURI(phrase)}`;
