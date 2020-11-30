module.exports = {
  type: 'input',
  name: 'authorEmail',
  message: 'Input an author email for this project',
  validate: function(input) {
    if (input === '' || input.includes('@')) {
      return true;
    }
    return `Please enter a valid email`;
  }
};
