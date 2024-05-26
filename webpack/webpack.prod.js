import common from "./webpack.common.js";
import webpack from "webpack";
import { merge } from "webpack-merge";

import path, { resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import TerserPlugin from "terser-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import FileManagerPlugin from "filemanager-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const build_date = new Date(Date.now())
const buildTimestamp = JSON.stringify(`${build_date.getDate()}.${build_date.getMonth() + 1}.${build_date.getFullYear()}/${build_date.getHours()}:${build_date.getMinutes()}:${build_date.getSeconds()}`);

export default merge(common, {
  output: {
    filename: "pwa-install.bundle.js",
    library: "PWAInstallComponent",
    path: resolve(__dirname, '../dist/'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: resolve(__dirname, "../dist/pwa-install.bundle.js"),
              destination: resolve(__dirname, "../docs/pwa-install.bundle.js"),
            }
          ],
        },
      },
    }),
    // this is not recommended approach, just for demo purposes
    new CopyWebpackPlugin({ 
      patterns: [
        { from: resolve(__dirname, "./service-worker-source.js"), to: resolve(__dirname, "../docs/service-worker.js"),
          transform: (content, path) => {
            return content.toString().replace(/BUILD_TIMESTAMP/g, buildTimestamp);
          }
        }
      ],

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
            unsafe: true,
          },
          mangle: true,
          output: {
            comments: false,
            beautify: false,
          },
        },
      }),
    ],
  },
  devtool: "source-map",
});
