const { exec } = require('child_process');

async function getAuthor(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.replace(/\n/, ''));
    });
  });
}

module.exports = async function () {
  const authorName = await getAuthor('git config user.name');
  if (authorName) {
    let authorEmail;
    try {
      authorEmail = await getAuthor('git config user.email');
    } catch (err) {
      console.warn('cannot get author email');
    }
    return {
      name: authorName,
      email: authorEmail,
    }
  }
  return {
    name: await getAuthor('whoami')
  }
}
