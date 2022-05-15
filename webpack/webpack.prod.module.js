const prod = require('./webpack.prod');
const { merge } = require('webpack-merge');
const externals = require('./externals');

delete prod.plugins;

module.exports = merge(prod, {
    output: {
        filename: 'pwa-install.es.js',
        library: {
            type: 'module',
        }
    },
    
    externals,

    externalsType: 'module',
    experiments: {
        outputModule: true,
    }
});