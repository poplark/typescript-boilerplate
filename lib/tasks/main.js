const { EventEmitter } = require('events');
const { GetAuthor } = require('./getAuthor');
const { GetPkg } = require('./getPkg');
const { GetReadme } = require('./getReadme');
const { WritePkg } = require('./writePkg');
const { WriteReadme } = require('./writeReadme');

class Scheduler extends EventEmitter {
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
          item.watch(this.doneTasks);
        });
      }
    });
    this.allTasks.push(task);
    this.todoTasks.push(task);
  }
  start() {
    // 触发未执行任务
    this.todoTasks.forEach(item => {
      item.watch(this.doneTasks);
    });
    this.emit('start');
  }
}

exports.run = function(context, pkgName, options) {
  return new Promise((resolve, reject) => {
    const scheduler = new Scheduler();

    scheduler.on('start', () => {
      console.log('tasks start...');
    });
    scheduler.on('error', () => {
      reject();
      console.log('tasks interrupt...');
    });
    scheduler.on('done', () => {
      console.log('tasks done...');
      resolve();
    });

    const getAuthorTask = new GetAuthor(context, options);
    scheduler.add(getAuthorTask);

    const getPkgTask = new GetPkg(context, options, pkgName);
    scheduler.add(getPkgTask, getAuthorTask);

    const getReadmeTask = new GetReadme(context, options);
    scheduler.add(getReadmeTask, getPkgTask);

    const writePkgTask = new WritePkg(context, options);
    scheduler.add(writePkgTask, getPkgTask);

    const writeReadmeTask = new WriteReadme(context, options);
    scheduler.add(writeReadmeTask, getReadmeTask);

    scheduler.start();
  });
}
