const fs = require('fs');
const copy = require('./copy');

fs.opendir("./tpl", async (err, dir) => {
  if (err) {
    console.log("read error ", err);
    return;
  }
  const src = './tpl';
  const dest = './dest';
  fs.mkdirSync(dest, { recursive: true });
  for await (const file of dir) {
    console.log(`file: ${file.name}`);
    copy.copyTo(src, file.name, dest);
  }
});