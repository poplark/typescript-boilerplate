const fs = require('fs-extra');
const path = require('path');

function getFileReadStreamMap(dir, file) {
  const result = new Map();
  result.set(file, fs.createReadStream(path.join(dir, file)));
  return result;
}

async function getDirectoryReadStreamMap(rootDir, subDir) {
  let result = new Map();
  const dir = path.join(rootDir, subDir);
  const subitems = await fs.readdir(dir);
  for (const subitem of subitems) {
    const stat = await fs.stat(path.join(dir, subitem));
    if (stat.isFile()) {
      const rsMap = getFileReadStreamMap(rootDir, path.join(subDir, subitem));
      result = new Map([...result, ...rsMap]);
    } else if (stat.isDirectory()) {
      const rsMap = await getDirectoryReadStreamMap(rootDir, path.join(subDir, subitem));
      result = new Map([...result, ...rsMap]);
    }
  }
  return result;
}

module.exports.getReadStreamMap = async function(dir, subitem) {
  let result;
  const subitemPath = path.join(dir, subitem);
  const stat = await fs.stat(subitemPath);
  if (stat.isFile()) {
    result = getFileReadStreamMap(dir, subitem);
  } else if (stat.isDirectory()) {
    result = await getDirectoryReadStreamMap(dir, subitem);
  }
  return result;
}
