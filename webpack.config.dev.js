const path = require('path');
const webpack = require('webpack');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development')
};

// webpack.config.js
module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'app')
  ],
  target: 'web',
  output: {
    path: path.join(__dirname,'./dist/'), // Note: Physical files are only output by the production build task `npm run build`.
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js?$/, include: path.join(__dirname, 'server'), loader: 'babel-loader' },
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'server')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS)
  ],
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['.js']
  }
};
