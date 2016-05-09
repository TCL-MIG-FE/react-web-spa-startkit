var path = require("path"),
    webpack = require("webpack"),
    proxy = require("./proxy");

var SRC_PATH = path.resolve(__dirname, 'resources'),
    DIST_PATH = path.resolve(__dirname, 'static'),
    FILE_HASH_TAG = '_[hash:5]',
    CHUNK_FILE_HASH_TAG = '_[chunkhash:5]';

var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");


var config = {
    entry: {
        app: path.join(SRC_PATH, 'app.js'),
        vendors: [
            'lodash',
            'classnames',
            'querystring',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-router-redux',
            'react-bootstrap',
            'redux',
            'redux-form',
            'redux-actions',
            'redux-async',
            'redux-thunk',
            // For echarts
            'echarts/lib/echarts',
            'echarts/lib/chart/bar'
        ],
        commons: path.join(SRC_PATH, 'layouts/css/common.less')
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
            'js/vendors_20160519.js', // vendor date
            Infinity
        ),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__DEV__': false
        }),

        new ExtractTextPlugin(`css/[name]${FILE_HASH_TAG}.css`, { allChunks: true }),

        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            warnings: false
        }),

        new HtmlWebpackPlugin({
            inject: false,
            filename: 'index.html',
            template: path.join(SRC_PATH, 'index.html'),
            chunks: ['commons', 'vendors', 'app']
        })

    ],

    module: {
        noParse: [],

        loaders: [{
                test: /\.js$/,
                loader: "babel",
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'react']
                },
                include: SRC_PATH,
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css!autoprefixer", {
                    publicPath: "../"
                }),
                exclude: /node_modules/,
            },

            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style", "css!autoprefixer!less", {
                    publicPath: "../"
                }),
                exclude: /node_modules/
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
