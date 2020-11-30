const { hasYarn } = require('@popark/tp-share-utils');

const packageManagers = [
  { name: 'Npm', value: 'npm', short: 'Npm', disabled: false },
  { name: 'Yarn', value: 'yarn', short: 'Yarn', disabled: !hasYarn() },
];

module.exports = {
  type: 'list',
  name: 'packageManager',
  message: 'Select a package manager',
  default: 'npm',
  choices: packageManagers,
}

// const packageManager = {
//   type: 'checkbox-plus',
//   name: 'packageManager',
//   message: 'Select a package manager',
//   default: ['npm'],
//   source: (previousAnswers, input) => {
//     input = input || '';
//     return new Promise((resolve) => {
//       resolve(packageManagers);
//     });
//   }
// }
