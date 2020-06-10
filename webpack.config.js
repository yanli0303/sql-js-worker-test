const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'worker.js',
    path: path.resolve(__dirname, 'docs'),
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  }
};
