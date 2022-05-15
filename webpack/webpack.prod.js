const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    output: {
        filename: 'pwa-install.bundle.js',
    },
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
                    }
                },
            })
        ],
    },
	devtool: 'source-map'
});