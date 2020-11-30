const { exec } = require('child_process');

async function execCommand(command, context) {
  return new Promise((resolve, reject) => {
    exec(command, {
      cwd: context
    }, (error, stdout, stderror) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderror) {
        reject(new Error(stderror));
        return;
      }
      resolve(stdout);
    });
  });
}


module.exports = {
  execCommand
}
