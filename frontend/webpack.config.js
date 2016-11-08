var webpack = require('webpack');
var path = require('path');

var config = {
  context: path.join(__dirname, 'app'),
  entry: [
    'whatwg-fetch',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './main.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api/*": {
        target: "http://192.168.99.100/",
        rewrite: function(req) {
          req.url = req.url.replace(/^\/api/, '');
        }
      }
    }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
      loader: 'babel', // The module to load. "babel" is short for "babel-loader"
      exclude: /node_modules/
    },{
      test: /\.scss$/,
      loader: 'style!css!sass'
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    },
    {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    }]
  }
};

module.exports = config;
