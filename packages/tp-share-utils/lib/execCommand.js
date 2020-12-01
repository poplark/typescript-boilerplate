const { spawn } = require('child_process');

async function execCommand(command, context) {
  /**
   * traditional way
   */
  const args = command.split(' ');
  const cmd = args.shift();
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: context,
      stdio: ['inherit', 'inherit', 'inherit']
    });

    child.on('close', code => {
      if (code !== 0) {
        reject(`command failed: ${command}`);
        return;
      }
      resolve();
    });
  });
}

module.exports = {
  execCommand
}
