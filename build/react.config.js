const webpack = require('webpack');
const path = require('path');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    'react-redux',
    'redux',
    'redux-thunk',
    'isomorphic-fetch',
];

module.exports = {
    entry: {
        react: vendors
    },
    output: {
        path: path.resolve(__dirname, '../assets/library'),
        filename: '[name].js',
        library: '[name]',
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DllPlugin({
            path: 'reactFest.json',
            name: '[name]',
            context: __dirname
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
