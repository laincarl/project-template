const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const appSrc = path.resolve(__dirname, 'src');
const appHtml = path.resolve(__dirname, 'public/index.html');
module.exports = {
  mode: isEnvDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  devtool: isEnvDevelopment ? 'cheap-module-source-map' : false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  target: 'web',
  experiments: {
    asyncWebAssembly: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: appSrc,
        loader: 'babel-loader',
        options: {
          plugins: [
            isEnvDevelopment && require.resolve('react-refresh/babel'),
          ].filter(Boolean),
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          // [ext]前面自带"."
          filename: 'assets/[hash:8].[name][ext]',
        },
      },
    ],
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 9000,
    stats: 'errors-warnings',
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        inject: true,
        template: appHtml,
        ...(isEnvProduction
          ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
          : undefined),
      },
    ),
    new WebpackBar(),
    isEnvDevelopment && new ForkTsCheckerWebpackPlugin(),
    isEnvDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
