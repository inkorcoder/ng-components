var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var path = require('path');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';


module.exports = webpackMerge(commonConfig, {

  output: {
    path: helpers.root('dist'),
    publicPath: 'dist',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    // contentBase: path.join(__dirname, "../dist"),
    // publicPath: path.join(__dirname, "../dist"),
    port: 1111,
    clientLogLevel: "none",
    // host: "0.0.0.0",
    // hot: true,
    stats: {
      colors: true,
      cached: false,
      modules: false,
    }
  //   historyApiFallback: true,
  //   compress: true,
  //   inline: true,
  },

  plugins: [
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle: {
    //     keep_fnames: true
    //   }
    // }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'ENV': JSON.stringify(ENV)
    //   }
    // }),
    // new webpack.LoaderOptionsPlugin({
    //   htmlLoader: {
    //     minimize: false
    //   }
    // })
  ]
});

