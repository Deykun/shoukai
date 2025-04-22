import chalk from 'chalk'
import fs, { existsSync, mkdirSync } from 'fs';

console.log()
console.log(chalk.green("Building..."));
console.log()

let template = fs.readFileSync(`./user-scripts/shoukai/template.js`, 'utf-8')
const partPaths = fs.readdirSync('./user-scripts/shoukai/dev');

partPaths.forEach((path) => {
  const partImportInTemplate = `/* import @/${path} */`
      
  if (template.includes(partImportInTemplate)) {
    let content = fs.readFileSync(`./user-scripts/shoukai/dev/${path}`, 'utf8');

    // Export are removed from user-script
    content = content.replace(/export const/g, 'const');

    // Eslint comments are removed from user-scripts
    [
      '/* eslint-disable no-undef */',
  ].forEach((eslintComment) => {
    content = content.replaceAll(eslintComment, '');
  });

    template = template.replace(partImportInTemplate, content);
    console.log(` - @/${chalk.blue(path)} was imported`);;
  } else {
    if (!path.includes('test.js')){
      console.log(` - @/${chalk.blue(path)} was ${chalk.red("skipped")}`);;
    }
  }
})

console.log();
console.log(chalk.green("Saving..."));
console.log();

if (!existsSync('./public/user-script')){
  mkdirSync('./public/user-script');
}

fs.writeFileSync('./public/user-script/shoukai.user-script.js', template);