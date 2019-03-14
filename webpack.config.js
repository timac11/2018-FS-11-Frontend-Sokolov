const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sourceRoot = path.resolve(__dirname, 'src');
const CSSSpritePlugin = require('css-sprite-loader').Plugin;

module.exports = {
    entry: sourceRoot + '/app/index.js',         //entryPoint to app to begin bilding
    output: {
        filename: "main.js",                     //bundle path
        path: path.resolve(__dirname, 'dist'),   //bundle location
        publicPath: '/',
    },
    module: {                                    //webpack understand only js and json files,
	    rules: [                                 //for .css files you should add loader
	        {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'css-sprite-loader']
            },
            /*{
                test: /\.css$/,
                loader: 'style-loader'
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                /!*query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }*!/
            },*/
            /*{
                test: /index\.css$/,
                include: sourceRoot,
                use: ExtractTextPlugin.extract('css-loader')
            },*/
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: {
                    loader: 'url-loader'
                }
            },
            {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader'
                }
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
    },
    plugins: [
        new CSSSpritePlugin({
            output: './icons'
        }),
        new ExtractTextPlugin({
            filename: 'index.css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app/index.html'
        })
    ]
};