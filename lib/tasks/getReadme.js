const { Task } = require('./task');

const Descriptions = {
  // 'bump:patch': '生成补丁版本，并生成线上产物及文档，供发布',
  // 'bump:minor': '生成次版本，并生成线上产物及文档，供发布',
  // 'bump:major': '生成主版本，并生成线上产物及文档，供发布',
  'test:e2e': 'Run your end-to-end tests',
  'test:unit': 'Run your unit tests',
};


export class GetReadme extends Task {
  constructor(context, options) {
    super('getReadme', context, options);
  }
  /**
   * dependencies: [getPkg]
   */
  run() {
    this.start();

    const getPkgTask = this.dependencies.find(item => item.name === 'getPkg');
    if (!getPkgTask) throw new Error('Dependency task [getPkg] not exists');

    const commandline = generateCommandline(getPkgTask.pkg, this.options.packageManager, this.options.initESLint, this.options.initTSDoc);

    this.readme = generateReadme(getPkgTask.pkg, commandline);

    this.end();
  }
}

function generateReadme(pkg, packageManager, commandline) {
  return [
    `# ${pkg.name}\n`,
    '## 使用方法',
    `\n### 初始化命令`,
    '```',
    `${packageManager}${packageManager !== 'yarn' ? 'install' : ''}`,
    '```',
    `\n### 其他命令`,
    commandline,
    '',
    `\n## API`,
  ].join('\n');
};

function generateCommandline(pkg, packageManager, initESLint, initTSDoc) {
  const descriptions = Object.assign({
    start: '开发环境中使用，支持自动编译及热更新',
    build: '上线前使用，编译并压缩生成线上产物',
    prepare: '发布前使用，生成线上产物',
  });
  if (initESLint) {
    descriptions.lint = '对 TS 文件进行代码检查';
    descriptions['lint:fix'] = '对 TS 文件进行代码修正';
  }
  if (initTSDoc) {
    descriptions.doc = '上线前使用，生成文档';
  }
  return Object.keys(pkg.scripts || {})
    .map(key => {
      if (!descriptions[key]) return '';
      return [
        `\n* ${descriptions[key]}`,
        '```',
        `${packageManager} ${packageManager !== 'yarn' ? 'run ' : ''}${key}`,
        '```',
        '',
      ].join('\n');
    })
    .join('');
}
