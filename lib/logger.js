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

/**
 * gray
 */
function debug(...args) {
  return chalk.gray(
    concatArgs(`${new Date().toISOString()} [DEBUG]: `, ...args)
  );
}

/**
 * blue
 */
function info(...args) {
  return chalk.blue(
    concatArgs(`${new Date().toISOString()} [INFO]: `, ...args)
  );
}

/**
 * yellow
 */
function warn(...args) {
  return chalk.yellow(
    concatArgs(`${new Date().toISOString()} [WARN]: `, ...args)
  );
}

/**
 * red
 */
function error(...args) {
  return chalk.red(
    concatArgs(` ${new Date().toISOString()} [ERROR]: `, ...args)
  );
}

function print(msg) {
  console.log(`${msg}`);
}

module.exports = {
  debug,
  info,
  warn,
  error,
  print,
};
