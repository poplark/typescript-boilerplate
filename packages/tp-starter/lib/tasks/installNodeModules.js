const { Task } = require('./task');
const { execCommand, hasGit } = require('@popark/tp-share-utils');

class InstallNodeModules extends Task {
  constructor(context, options) {
    super('installNodeModules', context, options);
  }
  /**
   * dependencies: [writePkg]
   */
  run() {
    this.start();

    execInstallPkg(this.context, this.options.packageManager)
      .then(() => {
        this.done();
      })
      .catch((err) => {
        console.error('install node modules ', err);
        this.interrupt(err);
      });
  }
}

async function execInstallPkg(context, pkgManager) {
  try {
    console.log(`使用 ${pkgManager} 安装依赖包...`);
    switch (pkgManager) {
      case 'yarn':
        await execCommand(`${pkgManager}`, context);
        break;
      case 'npm':
        await execCommand(`${pkgManager} install`, context);
        break;
      default:
        break;
    }
    console.log('安装依赖包... √');
  } catch(err) {
    console.error('安装依赖包... x');
    console.error(`执行 ${pkgManager} 安装失败`, err);
  }
}

exports.InstallNodeModules = InstallNodeModules;
