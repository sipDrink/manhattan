// Karma configuration
// Generated on Wed Dec 17 2014 16:52:24 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'www',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      // LIBS
   //   'lib/collide/collide.js',
      'lib/hammerjs/hammer.js',
      'lib/pubnub/web/pubnub.js',
      'lib/auth0-lock/build/auth0-lock.js',

      // all ng & ionic
      'lib/ionic/js/ionic.bundle.js',

      // 3rd party ng modules
      'lib/angular-aria/angular-aria.js',
      'lib/angular-material/angular-material.js',
      'lib/angular-mocks/angular-mocks.js',
      'lib/auth0-angular/build/auth0-angular.js',
      'lib/angular-local-storage/dist/angular-local-storage.js',
      'lib/angular-jwt/dist/angular-jwt.js',
      'lib/angular-material/angular-material.js',
      'lib/pubnub-angular/lib/pubnub-angular.js',
      'lib/ngCordova/dist/ng-cordova.js',
      'lib/flux-angular/build/flux-angular.js',
      'lib/ngGeodist/dist/ng-geodist.js',

      // expect.js
    //  '../node_modules/expect.js/index.js',

      // app code and specs
      'app/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


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
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
