import HtmlWebPackPlugin from 'html-webpack-plugin';
import { resolve, join } from 'path';

const appPath = resolve(__dirname, 'src');

module.exports = {
  devtool: 'eval', // Enable line-based sourcemaps
  entry: [
    'babel-polyfill',
    // 'react-hot-loader/patch',
    // 'isomorphic-fetch',
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: join(__dirname, 'dist')
  },

  devServer: {
    contentBase: appPath,
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
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: 'body',
      template: './index.html'
    })
  ],
};
