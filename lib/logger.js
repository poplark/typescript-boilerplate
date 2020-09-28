const chalk = require('chalk');

function concatArgs(...args) {
  let msg = '';
  args.forEach((item) => {
    if (typeof item === 'object') {
      msg += JSON.stringify(item);
    } else {
      msg += `${item}`;
    }
  });
  return msg;
}

class Logger {
  msg = '';
  constructor(msg) {
    this.msg = msg;
  }
  debug(...args) {
    this.msg += chalk.gray(concatArgs(...args));
    return this;
  }
  info(...args) {
    this.msg += chalk.blue(concatArgs(...args));
    return this;
  }
  warn(...args) {
    this.msg += chalk.yellow(concatArgs(...args));
    return this;
  }
  error(...args) {
    this.msg += chalk.red(concatArgs(...args));
    return this;
  }
  print() {
    console.log(chalk.gray(`${new Date().toISOString()}`), `${this.msg}`);
  }
  static debug(...args) {
    const msg = chalk.gray(concatArgs(` [DEBUG]: `, ...args));
    return new Logger(msg);
  }
  static info(...args) {
    const msg = chalk.blue(concatArgs(` [INFO]: `, ...args));
    return new Logger(msg);
  }
  static warn(...args) {
    const msg = chalk.yellow(concatArgs(` [WARN]: `, ...args));
    return new Logger(msg);
  }
  static error(...args) {
    const msg = chalk.red(concatArgs(` [ERROR]: `, ...args));
    return new Logger(msg);
  }
}

module.exports = Logger;
