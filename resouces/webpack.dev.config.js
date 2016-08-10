var path = require("path"),
	webpack = require("webpack"),
	proxy = require("./proxy");

var SRC_PATH = path.join(__dirname, 'src'),
	DIST_PATH = path.join(__dirname, '../static');

var HtmlWebpackPlugin = require('html-webpack-plugin');


var config = {
	entry: {
		apps: path.join(SRC_PATH, 'root.js'),
		vendors: [
			'lodash.merge',
			'classnames',
			'querystring',
			'react',
			'react-dom',
			'react-redux',
			'react-router',
			'react-router-redux',
			'redux',
			'redux-actions',
			'redux-promise',
			'redux-thunk',
			// For echarts
			'echarts/lib/echarts',
			'echarts/lib/chart/bar'
		]
	},

	resolve: {
		alias: {},
		extensions: ["", ".less", ".css", ".js", ".json"]
	},

	output: {
		path: DIST_PATH,
		publicPath: '',
		filename: "js/[name].js"
	},

	clearBeforeBuild: false,

	plugins: [
		new webpack.optimize.CommonsChunkPlugin(
			'vendors',
			'js/vendors.v20160810.js', // vendor date
			Infinity
		),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			'__DEV__': true
		}),

		new HtmlWebpackPlugin({
			inject: false,
			filename: './index.html',
			template: path.join(SRC_PATH, 'index.html')
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
			include: SRC_PATH,
		},

			{
				test: /\.css$/,
				loader: "style!css!autoprefixer!less"
			},

			{
				test: /\.less$/,
				loader: "style!css!autoprefixer!less"
			},

			{
				test: /\.(png|jpg|gif)$/,
				loader: "url",
				query: {
					limit: 8192,
					name: 'imgs/[name].[ext]'
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
	},

	devServer: {
		proxy: proxy
	}
};


console.log("initializing webpack developent build....");

module.exports = config;
