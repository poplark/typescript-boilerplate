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

async function execGit(context) {
  try {
    console.log('初始化代码库...');
    await execCommand('git init', context);
    console.log('初始化代码库... √');
  } catch(err) {
    console.log('初始化代码库... x');
    console.error('执行 git 失败，请检查机器上是否已安装 git', err);
  }
}

async function execInstallPkg(context, pkgManager) {
  try {
    console.log('安装依赖包...');
    await execCommand(`${pkgManager} install`, context);
    console.log('安装依赖包... √');
  } catch(err) {
    console.error('安装依赖包... x');
    console.error(`执行 ${pkgManager} install 失败`, err);
  }
}

module.exports = {
  execGit,
  execInstallPkg
}
