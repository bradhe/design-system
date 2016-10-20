const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    library: './source/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ExtractTextPlugin.extract('css!sass'),
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: require.resolve('babel-loader'),
      query: {
        presets: [
          require.resolve('babel-preset-es2015'),
          require.resolve('babel-preset-react'),
        ],
      },
    }],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'styleguide.css', allChunks: true }),
  ],
};
