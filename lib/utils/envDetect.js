const { execSync } = require('child_process');

const cache = {
  // yarn?: { has: boolean, version?: string }
  // git?: { has: boolean, version?: string }
};

Object.defineProperty(cache, 'hasYarn', {
  get: function() {
    if (!this.yarn) {
      this.yarn = { has: false };
      this.yarn.has = detectCommand(`yarn --version`);
    }
    return this.yarn.has;
  }
});
Object.defineProperty(cache, 'hasGit', {
  get: function() {
    if (!this.git) {
      this.git = { has: false };
      this.git.has = detectCommand(`git --version`);
    }
    return this.git.has;
  }
});

/**
 * 命令检测
 * @param {*} command 
 */
function detectCommand(command) {
  try {
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch (err) {
    return false;
  }
}

exports.hasYarn = () => {
  return cache.hasYarn;
}

exports.hasGit = () => {
  return cache.hasGit;
}
