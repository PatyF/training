process.env.NODE_ENV = 'test'

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'specs/tests.webpack.js', watched: false },
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'specs/tests.webpack.js': ['webpack'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: {
      module: {
        loaders: [{
          test: /\.jsx?$/,
          loader: 'babel', 
          exclude: /node_modules/
        },{
          test: /\.scss$/,
          loader: 'style!css!sass'
        }]
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
