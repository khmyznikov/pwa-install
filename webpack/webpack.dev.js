import common from './webpack.common.js';

import { merge }  from 'webpack-merge';
import path, { resolve }  from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
	plugins: [],
	optimization: {
        minimize: false,
    },
	devServer: {
		static: {
			directory: resolve(__dirname, '../docs')
		},
		compress: false,
		host: '0.0.0.0',
		port: 3000
	},
	devtool: 'source-map',
});