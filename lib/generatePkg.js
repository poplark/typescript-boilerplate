const originalPkg = {
  version: '0.1.0',
  private: true,
  scripts: {
    start: 'webpack --progress --watch --config config/webpack.dev.js',
    build: 'webpack --progress --config config/webpack.prod.js',
    doc: "typedoc",
    "clean:doc": "rm -rf docs",
    "clean:build": "rm -rf lib && rm -rf types",
    "clean": "npm run clean:doc && npm run clean:build",
    prepublish: "npm run clean && npm run build && npm run doc",
    'bump:patch': "npm version patch && npm run prepublish",
    'bump:minor': "npm version minor && npm run prepublish",
    'bump:major': "npm version major && npm run prepublish",
  },
  license: "MIT",
  main: "lib/index.js",
  typings: "types/index.d.ts",
  files: [
    "lib",
    "types",
    "docs"
  ],
  devDependencies: {
    "ts-loader": "^8.0.4",
    "typedoc": "^1.0.0-dev.3",
    "typescript": "^4.0.3",
    "webpack": "^5.0.0-rc.2",
    "webpack-cli": "^4.0.0-rc.0",
    "webpack-merge": "^5.1.4"
  },
};

module.exports = async function generatePkg(pkg, packageManager) {
  Object.assign(pkg, originalPkg);
  const author = await require('./getAuthor')();
  if (author.email) {
    pkg.author = author;
  } else {
    pkg.author = author.name;
  }

  return JSON.stringify(pkg, null, 2);
};
