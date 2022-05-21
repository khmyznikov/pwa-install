import path, { resolve }  from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
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
							},
							
						},
					}
				],
				exclude: /node_modules/,
				include: [/template-.*\.ts$/, /template\.ts/]
			},
			{
				test: /\.ts?$/,
				use: [
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
		filename: 'pwa-install.bundle.js',
		path: resolve(__dirname, '../dist'),
		publicPath: ''
	},
	resolve: {
		extensions: ['.ts', '.js']
	}
};