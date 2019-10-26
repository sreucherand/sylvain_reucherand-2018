const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
// .BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/app.production'),
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
              importLoaders: 1,
              modules: { localIdentName: '[hash:base64:5]' },
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
              importLoaders: 3,
              modules: { localIdentName: '[hash:base64:5]' },
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
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new ManifestPlugin(),
    new WorkboxPlugin.GenerateSW({
      runtimeCaching: [
        {
          handler: 'networkFirst',
          urlPattern: /\.html$/,
        },
        {
          handler: 'cacheFirst',
          urlPattern: /^https?:\/\/prismic-io\.s3\.amazonaws\.com\//,
        },
      ],
    }),
  ],

  resolve: {
    extensions: ['.js'],
  },

  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'src/loaders')],
  },
};
