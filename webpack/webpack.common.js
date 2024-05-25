import path, { resolve }  from 'path';
import { fileURLToPath } from 'url';

import autoprefixer from 'autoprefixer';

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
								],
								collapseInlineTagWhitespace: true,
								noNewlinesBeforeTagClose: true
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
				exclude: [/node_modules/],
			},

			{
				test: /\.scss$/,
				use: [
					{
						loader: 'lit-scss-loader',
						options: {
							minify: true,
							transform: (css, { filePath }) => processor.process(css, { from: filePath }).css
						},
					},
					// 'extract-loader',
					// 'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['postcss-import', autoprefixer()],
							},
						},
					},
					'sass-loader',
				],
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
