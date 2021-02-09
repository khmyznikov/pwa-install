const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve } = require('path');

module.exports = {
	module: {
		rules: [{
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
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, '../dist'),
	},
	devServer: {
		contentBase: resolve(__dirname, '../public'),
		compress: false,
		host: '0.0.0.0',
		port: 3000
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.js']
	}
};