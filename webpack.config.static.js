const path = require('path');
const webpack = require('webpack');
const externals = require('webpack-node-externals');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/app.static'),
  },

  externals: externals({
    whitelist: [
      'hammerjs',
      /^normalize\.css/,
    ],
  }),

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader/locals',
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
          {
            loader: 'css-loader/locals',
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
    ],
  },

  node: {
    __dirname: true,
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'bin'),
  },

  plugins: [
    new webpack.DefinePlugin({
      ACCESS_TOKEN: JSON.stringify(process.env.ACCESS_TOKEN),
      API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
    }),
  ],

  resolve: {
    alias: {
      hammerjs: path.resolve(__dirname, 'node_modules/emptyfunction'),
    },
    extensions: ['.js'],
  },

  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src/loaders'),
    ],
  },

  target: 'node',
};
