const path = require('path');
const externals = require('webpack-node-externals');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/app.static'),
  },

  externals: externals({
    whitelist: ['hammerjs', 'intersection-observer', /^normalize\.css/],
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
          {
            loader: 'css-loader/locals',
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
        exclude: /node_modules/,
        test: /\.gql$/,
        use: 'raw-loader',
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

  resolve: {
    alias: {
      hammerjs: path.resolve(__dirname, 'node_modules/emptyfunction'),
      'intersection-observer': path.resolve(
        __dirname,
        'node_modules/emptyfunction'
      ),
    },
    extensions: ['.js'],
  },

  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'src/loaders')],
  },

  target: 'node',
};
