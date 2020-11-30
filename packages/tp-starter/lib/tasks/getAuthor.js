const { exec } = require('child_process');
const { Task } = require('./task');
const { hasGit } = require('@popark/tp-share-utils');

class GetAuthor extends Task {
  constructor(context, options) {
    super('getAuthor', context, options);
    this.authorName = '';
    this.authorEmail = '';
  }
  /**
   * dependencies: []
   */
  run() {
    this.start();
    const getAuthorName = new Promise(async (resolve) => {
      let authorName = '';
      if (this.options.authorName !== '') {
        // 从用户输入处获得
        authorName = this.options.authorName;
      } else if (hasGit()) {
        // 从 git 中获得
        authorName = await getCommandOutput('git config user.name');
      } else {
        // 从系统中获得
        authorName = await getCommandOutput('whoami');
      }
      this.authorName = authorName;
      resolve();
    });
    const getAuthorEmail = new Promise(async (resolve) => {
      let authorEmail = '';
      if (this.options.authorEmail !== '') {
        authorEmail = this.options.authorEmail;
      } else if (hasGit()) {
        authorEmail = await getCommandOutput('git config user.email');
      }
      this.authorEmail = authorEmail;
      resolve();
    });
    Promise.all([getAuthorName, getAuthorEmail])
      .then(() => {
        this.done();
      })
      .catch((err) => {
        console.error('get author ', err);
        this.interrupt(err);
      });
  }
}

async function getCommandOutput(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.replace(/\n/, ''));
    });
  });
}

exports.GetAuthor = GetAuthor;
