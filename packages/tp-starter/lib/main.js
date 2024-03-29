const path = require('path');
// const logger = require('./logger');

const inquirer = require('inquirer');
const packageManagerQuestion = require('./questions/packageManager');
const bundleToolQuestion = require('./questions/bundleTool');
const initGitRepoQuestion = require('./questions/initGitRepo');
const initESLintQuestion = require('./questions/initESLint');
const initCommitLintQuestion = require('./questions/initCommitLint');
const initTSDocQuestion = require('./questions/initTSDoc');
const authorNameQuestion = require('./questions/authorName');
const authorEmailQuestion = require('./questions/authorEmail');
const projectDescriptionQuestion = require('./questions/projectDescription');
const { hasGit } = require('@popak/tp-share-utils');
const { clearConsole } = require('./utils/clearConsole');

const { GetAuthor } = require('./tasks/getAuthor');
const { GetPkg } = require('./tasks/getPkg');
const { GetReadme } = require('./tasks/getReadme');
const { WritePkg } = require('./tasks/writePkg');
const { WriteReadme } = require('./tasks/writeReadme');
const { CopyConfigurations } = require('./tasks/copyConfigurations');
const { CopyBoilerplate } = require('./tasks/copyBoilerplate');
const { InitGitRepo } = require('./tasks/initGitRepo');
const { InstallNodeModules } = require('./tasks/installNodeModules');
const { Scheduler } = require('./tasks/scheduler');

function run(context, pkgName, options) {
  return new Promise((resolve, reject) => {
    const scheduler = new Scheduler();

    scheduler.on('start', () => {
      console.log('tasks start...');
    });
    scheduler.on('error', () => {
      reject();
      console.log('tasks interrupt...');
    });
    scheduler.on('done', () => {
      console.log('tasks done...');
      resolve();
    });

    const getAuthorTask = new GetAuthor(context, options);
    scheduler.add(getAuthorTask);

    const getPkgTask = new GetPkg(context, options, pkgName);
    scheduler.add(getPkgTask, getAuthorTask);

    const getReadmeTask = new GetReadme(context, options);
    scheduler.add(getReadmeTask, getPkgTask);

    const writePkgTask = new WritePkg(context, options);
    scheduler.add(writePkgTask, getPkgTask);

    const writeReadmeTask = new WriteReadme(context, options);
    scheduler.add(writeReadmeTask, getReadmeTask);

    const copyConfigurationsTask = new CopyConfigurations(context, options);
    scheduler.add(copyConfigurationsTask);

    const copyBoilerplateTask = new CopyBoilerplate(context, options);
    scheduler.add(copyBoilerplateTask);

    let initGitRepoTask;
    if (hasGit()) {
      initGitRepoTask = new InitGitRepo(context, options);
      scheduler.add(initGitRepoTask, getAuthorTask, writePkgTask, writeReadmeTask, copyConfigurationsTask, copyBoilerplateTask);
    }

    const installNodeModulesTask = new InstallNodeModules(context, options);
    scheduler.add(installNodeModulesTask, writePkgTask, writeReadmeTask, copyConfigurationsTask, copyBoilerplateTask, initGitRepoTask);

    scheduler.start();
  });
}

exports.create = async function(projectName) {
  const context = path.join(process.cwd(), projectName);
  const pkgName = projectName;

  const confirm = await inquirer.prompt({
    type: 'confirm',
    name: 'continue',
    message: 'Input or select to configurate the project, continue?',
  });
  clearConsole();

  if (!confirm.continue) {
    return;
  }

  const projectDescription = await inquirer.prompt(projectDescriptionQuestion);
  clearConsole();
  const authorName = await inquirer.prompt(authorNameQuestion);
  clearConsole();
  const authorEmail = await inquirer.prompt(authorEmailQuestion);
  clearConsole();

  const pm = await inquirer.prompt(packageManagerQuestion);
  clearConsole();

  const bundle = await inquirer.prompt(bundleToolQuestion);
  clearConsole();

  let initGitRepo = { initGitRepo: false };
  if (hasGit()) {
    initGitRepo = await inquirer.prompt(initGitRepoQuestion);
    clearConsole();
  }

  const initESLint = await inquirer.prompt(initESLintQuestion);
  clearConsole();

  const initCommitLint = await inquirer.prompt(initCommitLintQuestion);
  clearConsole();

  const initTSDoc = await inquirer.prompt(initTSDocQuestion);
  clearConsole();

  const options = Object.assign({}, confirm, projectDescription, authorName, authorEmail, pm, bundle, initESLint, initCommitLint, initTSDoc, initGitRepo);

  await run(context, pkgName, options);
}
