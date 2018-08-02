const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/app.development'),
  },

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[hash:base64:5]',
              modules: true,
            },
          },
          'postcss-loader',
        ],
      },

      {
        test: /\.css\.js$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[hash:base64:5]',
              modules: true,
            },
          },
          'postcss-loader',
          'compile-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },

      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },

      {
        test: /\.woff2?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]',
          },
        },
      },
    ],
  },

  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin(), new UglifyJsPlugin()],
  },

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'public/static'),
    publicPath: '/static/',
  },

  plugins: [
    new webpack.DefinePlugin({
      ACCESS_TOKEN: JSON.stringify(process.env.ACCESS_TOKEN),
      API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new ManifestPlugin(),
  ],

  resolve: {
    extensions: ['.js'],
  },

  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'src/loaders')],
  },
};
