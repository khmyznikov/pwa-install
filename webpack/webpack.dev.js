const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const { resolve } = require('path');

module.exports = merge(common, {
	plugins: [],
	optimization: {
        minimize: false,
    },
	devServer: {
		contentBase: resolve(__dirname, '../public'),
		compress: false,
		host: '0.0.0.0',
		port: 3000
	},
	devtool: 'source-map',
});