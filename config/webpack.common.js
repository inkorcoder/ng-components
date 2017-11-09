var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
const extractSass = new ExtractTextPlugin({filename: "bundle.css"});


module.exports = {

	entry: {
		'polyfills': './src/polyfills.ts',
		'vendor': './src/vendor.ts',
		'app': './src/main.ts',
	},

	resolve: {
		extensions: ['.ts', '.js']
	},

	module: {

		rules: [
			{
				test: /\.(woff|woff2|ttf|otf|svg|png|jpg)$/,
				loader: 'ignore-loader'
			},
			{
				test: /\.ts$/,
				loaders: [{
					loader: 'awesome-typescript-loader',
					options: {
						configFileName: helpers.root('src', 'tsconfig.json')
					}
				}, 'angular2-template-loader']
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {
					attrs: [':data-src']
				}
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [{
						loader: "css-loader",
						options: {
							url: false
						}
					},{
						loader: "sass-loader"
					}],
					fallback: "style-loader"
				}),
			}
		]
	},

	plugins: [
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			helpers.root('./src'), {}
		),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),
		extractSass
	]
};