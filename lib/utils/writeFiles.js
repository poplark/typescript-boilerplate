const fs = require('fs-extra');
const path = require('path');

exports.writeFiles = async function(context, files) {
  for (const filename in files) {
    const filePath = path.join(context, filename);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, files[filename]);
  }
};
