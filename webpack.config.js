const path = require('path');

module.exports = {
  entry: './src/play/index.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './play'),
    filename: 'app.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
};
