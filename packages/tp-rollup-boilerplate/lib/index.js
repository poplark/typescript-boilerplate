const path = require('path');
const { getReadStreamMap } = require('@popark/tp-share-utils');

module.exports.run = async function() {
  let result = new Map();
  const dir = path.join(__dirname, '../templates');
  const templates = [
    'rollup.config.js',
    'src',
  ];
  for (const item of templates) {
    const map = await getReadStreamMap(dir, item);
    result = new Map([...result, ...map]);
  }
  return result;
}
