var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {

  output: {
    path: helpers.root('dist'),
    publicPath: 'dist',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [

  ]
});
