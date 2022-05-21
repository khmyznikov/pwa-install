import common from './webpack.common.js';
import webpack from 'webpack';
import { merge }  from 'webpack-merge';

import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default merge(common, {
    output: {
        filename: 'pwa-install.bundle.js',
        library: 'PWAInstallComponent'
    },
	plugins: [
        new CleanWebpackPlugin(),   
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ],
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
                    }
                },
            })
        ],
    },
	devtool: 'source-map'
});