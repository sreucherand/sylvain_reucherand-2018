const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || 3401;

module.exports = {
  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'src/Html'),
    hot: true,
    port: port,
    proxy: {
      '/graphql': 'http://localhost:4000',
    },
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
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      },

      {
        test: /\.css\.js$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              sourceMap: true,
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
        exclude: /node_modules/,
        test: /\.gql$/,
        use: 'raw-loader',
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

  plugins: [new webpack.HotModuleReplacementPlugin()],

  resolve: {
    extensions: ['.js'],
  },

  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'src/loaders')],
  },
};
