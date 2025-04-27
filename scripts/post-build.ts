import fs from "fs";
import { PATHS_DATA } from "../src/constants";

PATHS_DATA.forEach(({ path, title, social, lang = "en" }) => {
  let html = fs.readFileSync("./dist/index.html", "utf-8");

  if (lang) {
    html = html.replace('lang="en"', `lang="${lang}"`);
  }
  if (title) {
    html = html.replace(
      "<title>shoukai - personalized search</title>",
      `<title>${title}</title>`
    );
  }
  if (social) {
    html = html.replace("<!-- SOCIAL -->", social);
  }

  fs.writeFileSync(`./dist/${path}.html`, html);
});
