const { Task } = require('./task');
const { writeFiles } = require('../utils/writeFiles');

class WriteReadme extends Task {
  constructor(context, options) {
    super('writeReadme', context, options);
  }
  /**
   * dependencies: [getReadme]
   */
  run() {
    this.start();

    const getReadmeTask = this.dependencies.find(item => item.name === 'getReadme');
    if (!getReadmeTask) throw new Error('Dependency task [getReadme] not exists');

    writeFiles(this.context, {
      'README.md': getReadmeTask.readme
    }).then(() => {
      this.done();
    }).catch((err) => {
      console.error('write readme ', err);
      this.interrupt(err);
    });
  }
}

exports.WriteReadme = WriteReadme;
