/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const package = require('../package.json');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '../lib'),
    library: package.name,
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin(`${package.description}\n \n@author ${package.author.name}\n@license ${package.license}`),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(package.version),
    }),
  ],
};
