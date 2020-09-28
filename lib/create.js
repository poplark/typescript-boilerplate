const path = require('path');
const logger = require('./logger');

async function create(projectName, options) {
  const pkg = {
    name: projectName,
  };
  const dir = path.join(process.cwd(), projectName);
  const files = {};

  files['README.md'] = require('./generateReadme')(pkg, 'yarn');
  files['package.json'] = require('./generatePkg')(pkg, 'yarn');

  require('./write')(dir, files);
  require('./writeTemplates')(dir, path.join(__dirname, '../template'));
}

module.exports = async (...args) => {
  logger.info(`create `, ...args).print();
  return create(...args).catch(err => {
    logger.error(`create `, err).print();
  });
};
