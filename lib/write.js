const fs = require('fs-extra');
const path = require('path');

module.exports = async function writeFile(context, files) {
  Object.keys(files).forEach(name => {
    const filePath = path.join(context, name);
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, files[name]);
  });
};
