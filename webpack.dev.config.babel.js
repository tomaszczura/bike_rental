import HtmlWebPackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';

const appPath = resolve(__dirname, 'src');

module.exports = {

  devServer: {
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    inline: true,
    hot: true,
    stats: {
      chunkModules: false,
      modules: false,
      assets: false,
      chunks: false,
      children: false,
      hash: false,
      version: false,
    },
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js?$/,
        include: [appPath],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
};
