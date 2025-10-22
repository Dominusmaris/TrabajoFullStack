module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.js',
      'src/**/*.test.js'
    ],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'src/**/*.js': ['coverage']
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    concurrency: 2
  });
};