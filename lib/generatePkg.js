const originalPkg = {
  version: '0.1.0',
  private: true,
  scripts: {
    start: 'webpack --progress --watch --config config/webpack.dev.js',
    build: 'webpack --progress --config config/webpack.prod.js',
    docs: 'typedoc',
    'clean:docs': 'rm -rf docs',
    clean: 'rm -rf lib && rm -rf types',
    prepare: 'npm run clean && npm run build',
    'lint': 'eslint src --ext .ts',
    'lint:fix': 'eslint src --fix --ext .ts',
  },
  license: 'MIT',
  main: 'lib/index.js',
  typings: 'types/index.d.ts',
  files: ['lib', 'types', 'docs', 'README.md'],
  devDependencies: {
    '@typescript-eslint/eslint-plugin': '^4.3.0',
    '@typescript-eslint/parser': '^4.3.0',
    eslint: '^7.10.0',
    'eslint-config-prettier': '^6.12.0',
    'eslint-plugin-prettier': '^3.1.4',
    husky: '^4.3.0',
    'lint-staged': '^10.4.0',
    prettier: '^2.1.2',
    'ts-loader': '^8.0.4',
    typedoc: '^0.19.2',
    typescript: '^4.0.3',
    webpack: '^5.4.0',
    'webpack-cli': '^4.2.0',
    'webpack-merge': '^5.1.4',
  },
  husky: {
    hooks: {
      "pre-commit": "lint-staged",
      // "commit-msg": "commitlint -e $GIT_PARAMS",
      // "pre-push": "yarn changelog"
    }
  },
  'lint-staged': {
    'src/**/*.ts': [
      'eslint --fix',
      'typedoc',
      'git add docs'
    ]
  }
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
