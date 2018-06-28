const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  target: 'node',
  mode: 'development',
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
};
