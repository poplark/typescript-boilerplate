#!/usr/bin/env node

const chalk = require('chalk');
const { program } = require('commander');
const minimist = require('minimist');
const pkg = require('../package.json');

program.version(pkg.version, '-v, --version', `Display current verion`);
program.helpOption('-h, --help', `Read more information: ${chalk.underline('https://github.com/poplark/typescript-boilerplate')}`);

program
  .command('create <typescript-project-name>')
  .description(`Create a typescript project.`)
  .action((programName, cmd) => {
    const { create } = require('../lib/main');
    create(programName).then((res) => {
      console.log(`Create project ${programName} done.`, res);
    }).catch(err => {
      console.error(`Create project ${programName} error: `, err);
    });
  });

// output help information on unknown commands
program.arguments('<command>').action(cmd => {
  program.outputHelp();
  console.log(`  ` + chalk.yellow(`Unknown command ${chalk.red(cmd)}.`));
  console.log();
});

// program.on('-h --help', () => {
//   console.log();
//   console.log(`  Run ${chalk.blue(`tb <command> --help`)}`);
//   console.log();
// });
/**
 * 监听每个 command 的 help 行为
 */
// program.commands.forEach(command => command.on('--help', () => console.log()));

if (!process.argv.slice(2).length) {
  return program.outputHelp();
}

program.parse(process.argv);

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

function cleanArgs(cmd) {
  const args = {};
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''));
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key];
    }
  });
  return args;
}
