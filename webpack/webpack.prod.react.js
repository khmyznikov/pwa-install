import prod from './webpack.prod.js';
import { merge } from 'webpack-merge';
import externals from './externals.js';

import path, { resolve }  from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

delete prod.plugins;
// delete prod.module;

export default merge(prod, {
	entry: resolve(__dirname, '../src/fallback/react.ts'),
    output: {
        filename: 'pwa-install.react.js',
        library: {
            type: 'module'
        },
        path: resolve(__dirname, '../dist/'),
    },
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.ts?$/,
	// 			use: [
	// 				{
	// 					loader: 'ts-loader'
	// 				},
	// 			],
	// 			include: resolve(__dirname, '../src/fallback'),
	// 		},
	// 		{
	// 			test: /\.(scss|ts)$/,
	// 			use: 'null-loader',
	// 			exclude: resolve(__dirname, '../src/fallback'),
	// 		}
	// 	]
	// },
    
    externals,

	externalsType: 'module',
    experiments: {
        outputModule: true,
    }
});