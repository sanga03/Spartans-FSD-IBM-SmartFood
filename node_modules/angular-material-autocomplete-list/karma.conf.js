module.exports = function(config) {
  var COMPILED_SRC = [
    'dist/autocompleteList.js',
    'src/**/*.spec.js'
  ];

  var SRC = [
    'dist/autocompleteList.js',
    'src/**/*.spec.js'
  ];

  var DEPENDENCIES = [
    'node_modules/angular/angular.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-aria/angular-aria.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'node_modules/angular-material/angular-material.js',
  ];

  var files = DEPENDENCIES.concat((process.env.KARMA_TEST_COMPRESSED) ? COMPILED_SRC : SRC);

  var options = {
    basePath: './',
    frameworks: ['jasmine'],
    files: files,

    reporters: ['progress'],
    browsers: ['Firefox', 'PhantomJS'],
    singleRun: true,
    autoWatch: false,

    // Only launch one browser at a time since doing multiple can cause disconnects/issues
    concurrency: 1,

    client: {
      clearContext: false
    }
  }

  config.set(options);
}
