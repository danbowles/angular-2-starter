'use strict';

// Helpers
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var pkg = require('./package.json');

// Node
var path = require('path'),
    // NPM
    webpack = require('webpack');

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

  // entry: './bootstrap',
  entry: {
    'angular2': [
      // Angular Deps
      'rxjs',
      'zone.js',
      'reflect-metadata',
      // Combine into one file
      'angular2/angular2',
      'angular2/core',
      'angular2/router',
      'angular2/http',
    ],
    'app': [
      'babel-polyfill',
      './app/bootstrap'
    ]
  },

  output: {
    path: root('build'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].bundle.js'
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.json'],
    alias: {
    }
  },

  module: {
    noParse: [],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.html$/,
        loader: 'html'
        // loader: 'ngtemplate?relativeTo=/app/js/!html'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
}

function root(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
