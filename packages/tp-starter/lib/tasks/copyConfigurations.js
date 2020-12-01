const { Task } = require('./task');
const { write } = require('@popak/tp-share-utils');
const tpConfiguration = require('@popak/tp-configuration');

class CopyConfigurations extends Task {
  constructor(context, options) {
    super('copyConfigurations', context, options);
  }
  /**
   * dependencies: []
   */
  run() {
    this.start();

    tpConfiguration
      .run(this.options.initGitRepo, this.options.initESLint, this.options.initCommitLint, this.options.initTSDoc)
      .then(async (fileReadStreamMap) => {
        const fileStreams = fileReadStreamMap.entries();
        const promises = [];
        for (const item of fileStreams) {
          promises.push(write(this.context, item[0], item[1]));
        }
        return Promise.all(promises).then(() => { this.done(); });
      })
      .catch((err) => {
        console.error('copy configuration ', err);
        this.interrupt(err);
      });
  }
}

exports.CopyConfigurations = CopyConfigurations;
