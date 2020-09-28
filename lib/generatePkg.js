const originalPkg = {
  version: '0.1.0',
  private: true,
  scripts: {
    start: 'webpack --watch',
    build: 'webpack',
  },
  devDependencies: {},
};

module.exports = function generatePkg(pkg, packageManager) {
  const gPkg = Object.assign(
    {
      name: pkg.name,
    },
    originalPkg
  );
  return JSON.stringify(gPkg, null, 2);
};
