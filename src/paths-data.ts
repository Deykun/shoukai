// Kept dependency-free: imported by scripts/post-build.ts (runs in Node, no scss/vite).
export const PATHS_DATA: {
  path: string;
  title: string;
  social: string;
  lang: string;
}[] = [
  {
    path: "404",
    title: "404 - shoukai - personalized search",
    social: "",
    lang: "en",
  },
  {
    path: "reindex",
    title: "indexing... - shoukai - personalized search",
    social: "",
    lang: "en",
  },
] as const;
