// Karma configuration
// Generated on Sat May 08 2021 18:34:01 GMT+0200 (GMT+02:00)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['qunit'],


    // list of files / patterns to load in the browser
    files: [
      'https://code.jquery.com/jquery-3.5.1.min.js',
      './symfonyCollectionJs.js',
      './test/prep_jquery_tests.js',
      './test/base_fixtures.html',
      './test/tests.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.html': ['html2js'],
      'symfonyCollectionJs.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/with_jquery/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],
    customLaunchers:{
      HeadlessChrome:{
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--single-process', '--disable-dev-shm-usage']
      }
    },

    html2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'public/',

      // prepend this to the file path
      prependPrefix: 'served/',

      // or define a custom transform function
      processPath: function(filePath) {
        // Drop the file extension
        return filePath.replace(/\.html$/, '');
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
