const { Task } = require('./task');
const { execCommand, hasGit } = require('@popak/tp-share-utils');

class InitGitRepo extends Task {
  constructor(context, options) {
    super('initGitRepo', context, options);
  }
  /**
   * dependencies: [writePkg]
   */
  run() {
    this.start();

    if (hasGit() && this.options.initGitRepo) {
      execGit(this.context)
        .then(() => {
          this.done();
        })
        .catch((err) => {
          console.error('init git repo ', err);
          this.interrupt(err);
        });
    }
  }
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

exports.InitGitRepo = InitGitRepo;
