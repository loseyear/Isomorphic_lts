const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../client/client.jsx')
    },
    output: {
        publicPath: '../scripts/',
        path: path.resolve(__dirname, '../assets/scripts'),
        filename: '[name].js',
        chunkFilename: '[name]_[chunkhash:5].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, '../client')
                ],
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.s[ac]ss$/,
                loader: ExtractTextPlugin.extract({
                    use: ['css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]', 'sass-loader']
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader?name=../images/[hash:8].[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', 'jpg', 'jpeg', 'png', 'gif', 'svg']
    },
    devtool: 'sorece-map',
    plugins: [
        new ExtractTextPlugin('../styles/app.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
