const { resolve } = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'lit-scss-loader',
          options: {
            minify: true,
          },
        }, 'extract-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },
  plugins: [

  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '../dist'),
  },
  devServer: {
    contentBase: resolve(__dirname, '../public'),
    compress: false,
    port: 3000
  }
};
