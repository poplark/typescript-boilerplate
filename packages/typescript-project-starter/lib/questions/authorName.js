module.exports = {
  type: 'input',
  name: 'authorName',
  message: 'Input an author name for this project',
  default: '',
  // validate: (input) => {
  //   const done = this.async();
  //   Promise.resolve(() => {
  //     console.log('username: ', input);
  //     done(null, true);
  //   });
  // }
};
