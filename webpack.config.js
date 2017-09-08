var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
	entry:  './src/index.js',
	output: {
		path: path.resolve(__dirname,  'dist'),
		filename: 'scripts.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader',  'sass-loader']
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules\/*/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				]
			},
			{
				test: /\.pug$/,
				use: ['pug-loader']
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.(jpg|png|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]?v=' + (Math.round(Math.random() * 1e5)),
						outputPath: 'images/',
						publicPath: '/'
					}
				}
			}
		]
	},
	plugins: [
		new LiveReloadPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jquery: 'jquery'
		}),
		new ExtractTextPlugin('styles.css'),
		new HTMLWebpackPlugin({
			template: 'src/views/index.pug'
		})
	]
};