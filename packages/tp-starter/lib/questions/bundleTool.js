const tools = [
  { name: 'Webpack', value: 'webpack' },
  { name: 'Rollup', value: 'rollup' },
];

module.exports = {
  type: 'list',
  name: 'bundleTool',
  message: 'Select a bundle tool',
  default: 'webpack',
  choices: tools,
};
