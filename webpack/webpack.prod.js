const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve } = require('path');

module.exports = merge(common, {
	plugins: [new CleanWebpackPlugin()],
	optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js$/,
                extractComments: false,
                terserOptions: {
                    compress: {
                        drop_console: true,
                        unsafe: true
                    },
                    mangle: true,
                    output: {
                        comments: false,
                        beautify: false,
                    },
                    safari10: true,
                },
            })
        ],
    },
	devtool: 'source-map'
});