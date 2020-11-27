const { Task } = require('./task');
const { writeFiles } = require('../utils/writeFiles');

export class WriteReadme extends Task {
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

    writeFiles({
      'README.md': getReadmeTask.readme
    }).then(() => {
      this.end();
    }).catch((err) => {
      console.error('write readme ', err);
      this.interrupt(err);
    });
  }
}
