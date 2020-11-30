const fs = require('fs-extra');
const path = require('path');

module.exports.write = async function(context, relativeFilePath, readStream) {
  const dest = path.join(context, relativeFilePath);
  await fs.ensureDir(path.dirname(dest));
  readStream.pipe(fs.createWriteStream(dest));
}
