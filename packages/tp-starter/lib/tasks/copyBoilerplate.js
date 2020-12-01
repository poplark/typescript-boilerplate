const { Task } = require('./task');
const { write } = require('@popak/tp-share-utils');
const tpRollupTemplates = require('@popak/tp-rollup-boilerplate');
const tpWebpackTemplates = require('@popak/tp-webpack-boilerplate');

class CopyBoilerplate extends Task {
  constructor(context, options) {
    super('copyBoilerplate', context, options);
  }
  /**
   * dependencies: []
   */
  run() {
    this.start();

    let templates;
    switch(this.options.bundleTool) {
      case 'webpack':
        templates = tpWebpackTemplates;
        break;
      case 'rollup':
        templates = tpRollupTemplates;
        break;
      default:
        break;
    }
    if (!templates) {
      return this.interrupt(new Error(`wrong bundle tool ${this.options.bundleTool}`));
    }
    templates
      .run()
      .then(async (fileReadStreamMap) => {
        const fileStreams = fileReadStreamMap.entries();
        const promises = [];
        for (const item of fileStreams) {
          promises.push(write(this.context, item[0], item[1]));
        }
        return Promise.all(promises).then(() => { this.done(); });
      })
      .catch((err) => {
        console.error('copy boilerplate ', err);
        this.interrupt(err);
      });
  }
}

exports.CopyBoilerplate = CopyBoilerplate;
