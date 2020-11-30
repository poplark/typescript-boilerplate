const { getReadStreamMap } = require('./getReadStreamMap');
const { write } = require('./writeWithStream');
const { hasYarn, hasGit } = require('./envDetect');
const { execCommand } = require('./execCommand');

module.exports = {
  getReadStreamMap,
  write,
  hasYarn,
  hasGit,
  execCommand,
};
