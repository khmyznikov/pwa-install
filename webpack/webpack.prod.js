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

export default merge(common, {
  output: {
    filename: "pwa-install.bundle.js",
    library: "PWAInstallComponent",
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
            },
          ],
        },
      },
    }),
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
