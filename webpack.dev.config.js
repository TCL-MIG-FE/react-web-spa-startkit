var path = require("path"),
    webpack = require("webpack"),
    proxy = require("./proxy");

var SRC_PATH = path.resolve(__dirname, 'resources'),
    DIST_PATH = path.resolve(__dirname, 'static');

var HtmlWebpackPlugin = require('html-webpack-plugin');


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
        filename: "js/[name].js"
    },

    clearBeforeBuild: true,

    plugins: [
        new webpack.optimize.CommonsChunkPlugin(
            'vendors',
            'vendors.v20160519.js', // vendor date
            Infinity
        ),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            '__DEV__': true
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
                loader: "style!css!autoprefixer!less",
                exclude: /node_modules/
            },

            {
                test: /\.less$/,
                loader: "style!css!autoprefixer!less",
                exclude: /node_modules/
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
