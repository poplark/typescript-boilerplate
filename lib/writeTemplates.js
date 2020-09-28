const fs = require('fs-extra');
const path = require('path');
const logger = require('./logger');

async function copyFile(context, dir, file) {
  logger
    .debug(`copy file: `)
    .info(file)
    .debug(` from [`, dir, '] to [', context, ']')
    .print();
  await fs.ensureDir(context);
  const src = path.join(dir, file);
  const dest = path.join(context, file);
  const read = fs.createReadStream(src);
  const write = fs.createWriteStream(dest);
  read.pipe(write);
}

async function copyDir(context, rootDir, subDir) {
  let ctx = context;
  let dir = rootDir;
  if (subDir) {
    ctx = path.join(context, subDir);
    dir = path.join(rootDir, subDir);
  }

  const files = await fs.readdir(dir);

  files.forEach(async item => {
    const filePath = path.join(dir, item);
    const stat = await fs.stat(filePath);
    if (stat.isFile()) {
      copyFile(ctx, dir, item);
    } else if (stat.isDirectory()) {
      copyDir(ctx, dir, item);
    }
  });
}

module.exports = copyDir;
