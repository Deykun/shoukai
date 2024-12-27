export type WikipediaResult = {
  title: string;
  thumbnail?: string;
  description?: string;
  thumbnailStyle?: React.CSSProperties;
};

export const MANY_RESULTS_API_RESPONSE: {
  [lang: string]: string[];
} = {
  en: ["Wikimedia disambiguation page"],
  pl: [
    "strona ujednoznaczniająca w projekcie Wikimedia",
    "strona ujednoznaczniająca",
    "strona ujednoznaczniająca Wikipedii",
  ],
};