import prod from './webpack.prod.js';
import { merge } from 'webpack-merge';
import externals from './externals.js';

import path, { resolve }  from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

delete prod.plugins;

export default merge(prod, {
    output: {
        filename: 'pwa-install.umd.js',
        library: {
            name: 'PWAInstallComponent',
            type: 'umd'
        },
        path: resolve(__dirname, '../dist/umd'),
    },
    
    externals,
    externalsType: 'umd'
});