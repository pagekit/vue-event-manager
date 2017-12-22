const webpack = require('../webpack.config');

module.exports = config => {

  config.set({
    basePath: __dirname,
    frameworks: ['jasmine'],
    browsers: ['Chrome', 'Safari', 'Firefox'],
    files: ['index.js'],
    preprocessors: {
      'index.js': ['webpack']
    },
    webpack
  });

};