const prod = require('./webpack.prod');
const { merge } = require('webpack-merge');
const externals = require('./externals');

delete prod.plugins;

module.exports = merge(prod, {
    output: {
        filename: 'pwa-install.umd.js',
        library: {
            name: 'PWAInstall',
            type: 'umd',
        }
    },
    
    externals,
    externalsType: 'umd'
});