const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || 3401;

module.exports = {
  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'src/html'),
    hot: true,
    port: port,
  },

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:' + port + '/',
      path.join(__dirname, 'src/app.development'),
    ],
  },

  mode: 'development',

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true,
            },
          },
          'postcss-loader',
        ],
      },

      {
        exclude: /node_modules/,
        test: /\.css\.js$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
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
    noEmitOnErrors: true,
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/static'),
    publicPath: '/static/',
  },

  plugins: [
    new webpack.DefinePlugin({
      ACCESS_TOKEN: JSON.stringify(process.env.ACCESS_TOKEN),
      API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    extensions: ['.js'],
  },

  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src/loaders'),
    ],
  },
};
