const path = require('path');

const loaders = {
  rules: [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: { loader: 'babel-loader' },
  }],
};

module.exports = [{
  devtool: 'source-map',
  entry: './src/main/index.js',
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'docs'),
  },
  module: loaders,
},
{
  devtool: 'source-map',
  entry: './src/worker/index.js',
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'docs'),
  },
  module: loaders,
},
];
