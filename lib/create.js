const path = require('path');
const logger = require('./logger');

async function create(projectName, options) {
  const pkg = {
    name: projectName,
    description: options.description || projectName
  };
  const context = path.join(process.cwd(), projectName);
  const files = {};

  files['package.json'] = await require('./generatePkg')(pkg, 'yarn');
  files['README.md'] = require('./generateReadme')(pkg, 'yarn');

  require('./write')(context, files);
  require('./writeTemplates')(context, path.join(__dirname, '../template'));
}

module.exports = async (...args) => {
  logger.info(`create `, ...args).print();
  return create(...args).catch(err => {
    logger.error(`create `, err).print();
  });
};
