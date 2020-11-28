const { EventEmitter } = require('events');

class Task extends EventEmitter {
  constructor(name, context, options) {
    super();
    this.name = name;
    this.context = context;
    this.options = options;
    this.dependencies = [];
  }

  setDependencies(...tasks) {
    tasks.forEach(task => {
      this.dependencies.push(task);
    });
  }

  start() {
    this.hasStarted = true;
    this.emit('start');
  }
  interrupt(err) {
    this.emit('error', err);
  }
  done() {
    this.emit('done');
  }
  /**
   * 需要被实现类重写
   */
  run() {
    this.start();
    this.done();
  }

  watch(doneTaskList) {
    if (this.hasStarted) return;
    // todo - 使用 proxy 监听 doneList ?? 自动触发后续比对?
    // 比对
    for (const item of this.dependencies) {
      if (!doneTaskList.includes(item)) {
        return;
      }
    }
    this.run();
  }
}

exports.Task = Task;
