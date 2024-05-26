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
	entry: resolve(__dirname, '../src/react-legacy/pwa-install.react-legacy.ts'),
    output: {
        filename: 'pwa-install.react-legacy.js',
        library: {
            type: 'module'
        },
        path: resolve(__dirname, '../dist/react-legacy/'),
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
	// 			include: resolve(__dirname, '../src/react-legacy'),
	// 		},
	// 		{
	// 			test: /\.(scss|ts)$/,
	// 			use: 'null-loader',
	// 			exclude: resolve(__dirname, '../src/react-legacy'),
	// 		}
	// 	]
	// },
    
    externals,

	externalsType: 'module',
    experiments: {
        outputModule: true,
    }
});