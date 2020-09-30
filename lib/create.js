const path = require('path');
const logger = require('./logger');

async function create(projectName, options) {
  const pkg = {
    name: projectName,
    description: options.description || projectName
  };
  const context = path.join(process.cwd(), projectName);
  const files = {};

  const pkgManager = 'yarn';

  files['package.json'] = await require('./generatePkg')(pkg, pkgManager);
  files['README.md'] = require('./generateReadme')(pkg, pkgManager);
  require('./write')(context, files);

  const { execGit, execInstallPkg } = require('./execCommand');
  await execGit(context);
  await execInstallPkg(context, pkgManager);

  require('./writeTemplates')(context, path.join(__dirname, '../template'));
}

module.exports = async (...args) => {
  logger.info(`create `, ...args).print();
  return create(...args).catch(err => {
    logger.error(`create `, err).print();
  });
};
