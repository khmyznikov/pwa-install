const { resolve } = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: [
					{
						loader: 'minify-lit-html-loader',
						options: {
							htmlMinifier: {
							ignoreCustomFragments: [
								/<\s/,
								/<=/
							]
							}
						}
					},
					{
						loader: 'ts-loader'
					},
					],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [{
					loader: 'lit-scss-loader',
					options: {
						minify: true,
					},
				}, 'extract-loader', 'css-loader', 'sass-loader'],
			},
		]
	},
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, '../dist'),
	},
	resolve: {
		extensions: ['.ts', '.js']
	}
};