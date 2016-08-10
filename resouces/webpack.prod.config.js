var path = require("path"),
	webpack = require("webpack"),
	proxy = require("./proxy");

var SRC_PATH = path.join(__dirname, 'src'),
	DIST_PATH = path.join(__dirname, '../static'),
	FILE_HASH_TAG = '_[hash:5]',
	CHUNK_FILE_HASH_TAG = '_[chunkhash:5]';

var HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
	entry: {
		apps: path.join(SRC_PATH, 'root.js'),
		vendors: [
			'lodash.merge',
			'querystring',
			'react',
			'react-dom',
			'react-redux',
			'react-router',
			'react-router-redux',
			'redux',
			'redux-actions',
			'redux-promise'
		]
	},

	resolve: {
		alias: {},
		extensions: ["", ".less", ".css", ".js", ".json"]
	},

	output: {
		path: DIST_PATH,
		publicPath: '',
		filename: `js/[name]${FILE_HASH_TAG}.js`,
		chunkFilename: `js/[name]${CHUNK_FILE_HASH_TAG}.js`
	},

	clearBeforeBuild: true,

	plugins: [
		new webpack.optimize.CommonsChunkPlugin(
			'vendors',
			`js/vendors_20160810.js`,
			Infinity
		),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'__DEV__': false
		}),

		new ExtractTextPlugin(`css/commons${FILE_HASH_TAG}.css`, {allChunks: true}),

		new webpack.optimize.UglifyJsPlugin({
			comments: false,
			warnings: false
		}),

		new HtmlWebpackPlugin({
			inject: false,
			filename: '../index.jsp',
			template: path.join(SRC_PATH, 'index.jsp'),
			context: "<%=request.getContextPath()%>",
			user:"${currUser.email}",
			encoding:`<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" %>`,
			taglib:`<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>`
		})
	],

	module: {
		noParse: [],

		loaders: [{
			test: /\.js$/,
			loader: "babel",
			query: {
				plugins: ['transform-runtime', ["antd", {"style": true}]],
				presets: ['es2015', 'react', 'stage-0']
			},
			include: SRC_PATH
		},

			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style", "css!autoprefixer", {
					publicPath: "../"
				})
			},

			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style", "css!autoprefixer!less", {
					publicPath: "../"
				})
			},

			{
				test: /\.(png|jpg|gif)$/,
				loader: "url",
				query: {
					limit: 8192,
					name: `imgs/[name]${FILE_HASH_TAG}.[ext]`
				}
			},

			{
				test: /\.(eot|woff|woff2|ttf|svg)((\?|\#)[\?\#\w\d_-]+)?$/,
				loader: "url",
				query: {
					limit: 100,
					name: 'fonts/[name].[ext]'
				}
			}
		]
	}
};


console.log("initializing webpack production build....");

module.exports = config;
