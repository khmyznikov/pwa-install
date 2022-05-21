import prod from './webpack.prod.js';
import { merge } from 'webpack-merge';
import externals from './externals.js';

delete prod.plugins;

export default merge(prod, {
    output: {
        filename: 'pwa-install.umd.js',
        library: {
            name: 'PWAInstallComponent',
            type: 'umd',
        }
    },
    
    externals,
    externalsType: 'umd'
});