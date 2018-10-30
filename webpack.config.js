const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sourceRoot = path.resolve(__dirname, 'src');

module.exports = {
    entry: sourceRoot + '/app/index.js',         //entryPoint to app to begin bilding
    output: {
        filename: "main.js",                     //bundle path
        path: path.resolve(__dirname, 'dist')    //bundle location
    },
    module: {                                    //webpack understand only js and json files,
	    rules: [                                 //for .css files you should add loader
	        {
	            test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                include: sourceRoot,
            },
            {
                test: /shadow\.css$/,            //only by pattern is it possible incapsulate styles?
                include: sourceRoot,
                use: {
                    loader: 'css-loader'
                }
            },
            {
                test: /index\.css$/,
                include: sourceRoot,
                use: ExtractTextPlugin.extract('css-loader')
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: {
                    loader: 'url-loader'
                }
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'index.css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app/index.html'
        })
    ]
};