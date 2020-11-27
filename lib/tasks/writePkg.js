const { Task } = require('./task');
const { writeFiles } = require('../utils/writeFiles');

export class WritePkg extends Task {
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

    writeFiles({
      'package.json': JSON.stringify(getPkgTask.pkg, null, 2)
    }).then(() => {
      this.end();
    }).catch((err) => {
      console.error('write pkg ', err);
      this.interrupt(err);
    });
  }
}
