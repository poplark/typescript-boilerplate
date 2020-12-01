const { EventEmitter } = require('events');

module.exports.Scheduler = class Scheduler extends EventEmitter {
  allTasks = [];
  todoTasks = [];
  doneTasks = [];
  add(task, ...dependencies) {
    task.setDependencies(...dependencies);
    task.on('start', () => {
      // 任务开始，就从待执行任务列表 [todoTasks] 中移除
      this.todoTasks = this.todoTasks.filter(item => item !== task);
    });
    task.on('done', () => {
      // 任务结束，就添加到已完成任务列表 [doneTasks] 中
      this.doneTasks.push(task);
      if (this.doneTasks.length === this.allTasks.length) {
        this.emit('done');
      } else {
        // 主动触发未执行任务
        // todo - 改成被动通知？？？
        this.todoTasks.forEach(item => {
          item.hooks(this.doneTasks);
        });
      }
    });
    this.allTasks.push(task);
    this.todoTasks.push(task);
  }
  start() {
    this.emit('start');
    // 触发未执行任务
    this.todoTasks.forEach(item => {
      item.hooks(this.doneTasks);
    });
  }
}
