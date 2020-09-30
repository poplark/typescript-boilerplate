const descriptions = {
  start: '开发环境中使用，支持自动编译及热更新',
  build: '上线前使用，编译并压缩生成线上产物',
  doc: '上线前使用，生成文档',
  prepublish: '发布前使用，生成线上产物及文档',
  // 'bump:patch': '生成补丁版本，并生成线上产物及文档，供发布',
  // 'bump:minor': '生成次版本，并生成线上产物及文档，供发布',
  // 'bump:major': '生成主版本，并生成线上产物及文档，供发布',
  lint: 'Lint并自动修正',
  'test:e2e': 'Run your end-to-end tests',
  'test:unit': 'Run your unit tests',
};

function printScripts(pkg, packageManager) {
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

module.exports = function generateReadme(pkg, packageManager) {
  return [
    `# ${pkg.name}\n`,
    '## 使用方法',
    `\n### 初始化命令`,
    '```',
    `${packageManager} install`,
    '```',
    `\n### 其他命令`,
    printScripts(pkg, packageManager),
    '',
    `\n## API`,
  ].join('\n');
};
