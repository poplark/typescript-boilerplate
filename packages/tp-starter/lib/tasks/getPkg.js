const { Task } = require('./task');

const BasicPkg = {
  version: '0.1.0',
  private: true,
  license: 'MIT',
  main: 'dist/index.js',
  typings: 'types/index.d.ts',
  files: ['dist', 'types', 'docs'],
};

class GetPkg extends Task {
  constructor(context, options, pkgName) {
    super('getPkg', context, options);
    this.pkg = Object.assign({ name: pkgName }, BasicPkg);
  }
  /**
   * dependencies: [getAuthor]
   */
  run() {
    this.start();
    setDescription(this.pkg, this.options.projectDescription);

    const getAuthorTask = this.dependencies.find(item => item.name === 'getAuthor');
    if (!getAuthorTask) throw new Error('Dependency task [getAuthor] not exists');
    setAuthor(this.pkg, getAuthorTask);

    setModule(this.pkg, this.options.bundleTool);

    setScripts(this.pkg, this.options);

    setDevDependencies(this.pkg, this.options);

    this.done();
  }
}

function setModule(pkg, bundleTool) {
  if (bundleTool === 'rollup') {
    pkg.module = 'dist/index.esm.js'
  }
}


function setDescription(pkg, description) {
  pkg.description = description;
}

function setAuthor(pkg, getAuthorTask) {
  if (getAuthorTask.authorEmail) {
    pkg.author = {
      name: getAuthorTask.authorName,
      email: getAuthorTask.authorEmail,
    }
  } else {
    pkg.author = getAuthorTask.authorName;
  }
}

function setScripts(pkg, options) {
  pkg.scripts = {
    clean: 'rm -rf dist && rm -rf types',
  };

  switch (options.packageManager) {
    case 'npm':
      pkg.scripts['prepublish'] = `npm run clean && npm run build`;
      break;
    case 'yarn':
      pkg.scripts['prepublish'] = `yarn clean && yarn build`;
      break;
    default:
      console.warn('package manager not exists');
      break;
  }

  switch (options.bundleTool) {
    case 'webpack':
      pkg.scripts['start'] = `webpack --progress --watch --config config/webpack.dev.js`;
      pkg.scripts['build'] = `webpack --progress --config config/webpack.prod.js`;
      break;
    case 'rollup':
      pkg.scripts['start'] = `rollup -c --watch rollup.config.js`;
      pkg.scripts['build'] = `rollup -c rollup.config.js`;
      break;
    default:
      console.warn('bundle tool not exists');
      break;
  }

  if (options.initESLint) {
    pkg.scripts['lint'] = `eslint src --ext .ts`;
    pkg.scripts['lint:fix'] = `eslint src --fix --ext .ts`;
  }

  if (options.initCommitLint) {
    pkg.scripts['commit'] = `git-cz`;
  }

  if (options.initTSDoc) {
    pkg.scripts['docs'] = 'typedoc --plugin none'; // 默认不使用 typedoc-plugin-markdown 生成 markdown 类的文档
  }
}

function setDevDependencies(pkg, options) {
  pkg.devDependencies = {
    typescript: `^4.0.5`,
  };

  switch (options.bundleTool) {
    case 'webpack':
      pkg.devDependencies['webpack'] = `^5.4.0`;
      pkg.devDependencies['webpack-cli'] = `^4.2.0`;
      pkg.devDependencies['webpack-merge'] = `^5.1.4`;
      pkg.devDependencies['ts-loader'] = `^8.0.4`;
      break;
    case 'rollup':
      pkg.devDependencies['rollup'] = `^2.33.1`;
      pkg.devDependencies['@rollup/plugin-commonjs'] = `^16.0.0`;
      pkg.devDependencies['@rollup/plugin-json'] = `^4.1.0`;
      pkg.devDependencies['@rollup/plugin-node-resolve'] = `^10.0.0`;
      pkg.devDependencies['@rollup/plugin-replace'] = `^2.3.4`;
      // todo - remove one: @rollup/plugin-typescript, rollup-plugin-typescript2
      pkg.devDependencies['@rollup/plugin-typescript'] = `^6.1.0`;
      pkg.devDependencies['rollup-plugin-typescript2'] = `^0.29.0`;
      pkg.devDependencies['tslib'] = `^2.0.3`;
      break;
    default:
      break;
  }

  if (options.initESLint) {
    pkg.devDependencies['@typescript-eslint/eslint-plugin'] = `^4.8.0`;
    pkg.devDependencies['@typescript-eslint/parser'] = `^4.8.0`;
    pkg.devDependencies['eslint'] = '^7.13.0';
    pkg.devDependencies['eslint-config-prettier'] = `^6.15.0`;
    pkg.devDependencies['eslint-plugin-prettier'] = `^3.1.4`;
    pkg.devDependencies['husky'] = `^4.3.0`;
    pkg.devDependencies['lint-staged'] = `^10.5.1`;
    pkg.devDependencies['prettier'] = `^2.1.2`;
    pkg.husky = {
      hooks: {
        'pre-commit': 'lint-staged',
        // todo - commitlint
        // 'commit-msg': 'commitlint -e $GIT_PARAMS',
        // 'pre-push': 'yarn changelog'
      }
    }
    pkg['lint-staged'] = {
      'src/**/*.ts': [
        'eslint --fix',
      ]
    }
  }

  if (options.initCommitLint) {
    pkg.devDependencies['@commitlint/config-conventional'] = `^11.0.0`;
    pkg.devDependencies['commitlint'] = `^11.0.0`;
    // 自动生成  changelog
    // pkg.devDependencies['conventional-changelog'] = `^3.1.24`;
    pkg.devDependencies['cz-conventional-changelog'] = `^3.3.0`;
    pkg.config = {
      "commitizen": {
        "path": "./node_modules/cz-conventional-changelog"
      }
    }
    if (pkg.husky) {
      pkg.husky.hooks = pkg.husky.hooks || {};
      pkg.husky.hooks['commit-msg'] = "commitlint -e $GIT_PARAMS";
    } else {
      pkg.husky = {
        hooks: {
          "pre-commit": "lint-staged",
          "commit-msg": "commitlint -e $GIT_PARAMS"
        }
      }
    }
  }

  if (options.initTSDoc) {
    pkg.devDependencies['typedoc'] = `^0.21.2`;
    pkg.devDependencies['typedoc-plugin-markdown'] = `^3.10.2`;
    if (options.initESLint) {
      pkg['lint-staged']['src/**/*.ts'] = pkg['lint-staged']['src/**/*.ts'].concat([
        'typedoc --plugin none',
        'git add docs'
      ]);
    }
  }
}

exports.GetPkg = GetPkg;
