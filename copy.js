const fs = require('fs');
const path = require('path');

module.exports = {
  copyTo(sdir, file, ddir) {
    const src = path.resolve(sdir, file);
    const dest = path.resolve(ddir, file);

    const read = fs.createReadStream(src);
    const write = fs.createWriteStream(dest);
    read.pipe(write);
  }
}