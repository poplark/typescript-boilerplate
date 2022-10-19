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

    const getAuthorTask = this.dependencies.find(item => item.name === 'getAuthor');

    if (hasGit() && this.options.initGitRepo) {
      execGit(this.context, getAuthorTask)
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

async function execGit(context, getAuthorTask) {
  try {
    console.log('初始化代码库...');
    await execCommand('git init', context);
    if (getAuthorTask && getAuthorTask.authorName) {
      await execCommand(`git config user.name ${getAuthorTask.authorName}`, context);
    }
    if (getAuthorTask && getAuthorTask.authorEmail) {
      await execCommand(`git config user.email ${getAuthorTask.authorEmail}`, context);
    }
    console.log('初始化代码库... √');
  } catch(err) {
    console.log('初始化代码库... x');
    console.error('执行 git 失败，请检查机器上是否已安装 git', err);
  }
}

exports.InitGitRepo = InitGitRepo;
