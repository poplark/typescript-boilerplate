const { Task } = require('./task');
const { writeFiles } = require('../utils/writeFiles');

class WritePkg extends Task {
  constructor(context, options) {
    super('writePkg', context, options);
  }
  /**
   * dependencies: [getPkg]
   */
  run() {
    this.start();

    const getPkgTask = this.dependencies.find(item => item.name === 'getPkg');
    if (!getPkgTask) throw new Error('Dependency task [getPkg] not exists');

    writeFiles(this.context, {
      'package.json': JSON.stringify(getPkgTask.pkg, null, 2)
    }).then(() => {
      this.done();
    }).catch((err) => {
      console.error('write pkg ', err);
      this.interrupt(err);
    });
  }
}

exports.WritePkg = WritePkg;
