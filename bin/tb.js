#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const minimist = require('minimist');

program
  .command('create <typescript-program-name>')
  .description(`创建一个新的 typescript 项目`)
  .option('-d, --default', `默认`)
  .option('-o, --output', `输出`)
  .action((name, cmd) => {
    const options = cleanArgs(cmd);
    require('../lib/create')(name, options);
  });

// output help information on unknown commands
program.arguments('<command>').action(cmd => {
  program.outputHelp();
  console.log(`  ` + chalk.green(`未知命令 ${chalk.info(cmd)}.`));
  console.log();
});

program.on('--help', () => {
  console.log();
  console.log(`  Run ${chalk.blue(`tb <command> --help`)}`);
  console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

if (!process.argv.slice(3).length) {
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
