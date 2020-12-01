const path = require('path');
const { getReadStreamMap } = require('@popak/tp-share-utils');

module.exports.run = async function(initGitRepo, initESLint, initCommitLint, initTSDoc) {
  let result = new Map();
  const dir = path.join(__dirname, '../configs');
  const templates = [
    '.editorconfig',
    'tsconfig.json',
  ];
  if (initGitRepo) {
    templates.push('.gitignore');
  }
  if (initESLint) {
    templates.push('.eslintignore');
    templates.push('.eslintrc.js');
    templates.push('.prettierrc.js');
  }
  if (initCommitLint) {
    templates.push('commitlint.config.js');
  }
  if (initTSDoc) {
    templates.push('typedoc.json');
  }
  for (const item of templates) {
    const map = await getReadStreamMap(dir, item);
    result = new Map([...result, ...map]);
  }
  return result;
}
