'use strict';

// Helpers
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var pkg = require('./package.json');

// Node
var path = require('path'),
    // NPM
    webpack = require('webpack'),

    // Webpack plugins
    HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  debug: true,
  cache: true,

  verbose: true,
  displayErrorDetails: true,
  context: __dirname,
  stats: {
    colors: true,
    reasons: true
  },

  // dev server
  devServer: {
    inline: true,
    colors: true,
    historyApiFallback: true
  },

  entry: {
    'vendor': './src/vendor',
    'main': './src/main'
  },

  output: {
    path: root('dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].bundle.js'
  },

  resolve: {
    extensions: ['','.ts','.js','.json','.css','.html'],
  },

  module: {
    preLoaders: [{ test: /\.ts$/, loader: 'tslint-loader', exclude: [/node_modules/] }],
    loaders: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          'ignoreDiagnostics': [
            2403, // 2403 -> Subsequent variable declarations
            2300, // 2300 -> Duplicate identifier
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
        exclude: [ /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/ ]
      },

      { test: /\.html$/,  loader: 'raw-loader' },

      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html', inject: false }),
  ]
}

function root(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
