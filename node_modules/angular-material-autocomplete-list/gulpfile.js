var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var mergeStream = require('merge-stream');
var order = require('gulp-order');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var git = require('gulp-git');
var templateCache = require('gulp-angular-templatecache');
var jsdoc2md = require('gulp-jsdoc-to-markdown');

var Server = require('karma').Server;


var CONFIG = {
  jsFiles: ['src/**/*.js', '!**/*.spec.js'],
  distFiles: ['dist/**/*'],
  templates: ['src/templates/**/*'],
  allSrc: ['src/**/*'],
  // Must be a string
  pagesSrc: 'demo/'
};


gulp.task('clean', function() {
  return del(CONFIG.distFiles);
});


gulp.task('jshint', function() {
  return gulp.src(CONFIG.jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


// Builds unminified source code
gulp.task('build-fast', ['clean'], function() {
  function buildTemplates() {
    return gulp.src(CONFIG.templates)
      .pipe(templateCache({module: 'autocomplete'}));
  }

  function buildScripts() {
    return gulp.src(CONFIG.jsFiles);
  }

  return mergeStream(buildTemplates(), buildScripts())
    .pipe(order([
      '!template.js',
      'template.js'
    ]))
    .pipe(concat('autocompleteList.js'))
    .pipe(gulp.dest('dist'));
});


// Full build with minification
gulp.task('build', ['clean'], function() {
  function buildTemplates() {
    return gulp.src(CONFIG.templates)
      .pipe(htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeTagWhitespace: true,
        removeAttributeQuotes: true
      }))
      .pipe(templateCache({module: 'autocompleteList'}));
  }

  function buildScripts() {
    return gulp.src(CONFIG.jsFiles);
  }

  return mergeStream(buildTemplates(), buildScripts())
    .pipe(order([
      '!template.js',
      'template.js'
    ]))
    .pipe(concat('autocompleteList.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('autocompleteList.min.js'))
    .pipe(gulp.dest('dist'));
});


// Runs unit tests
gulp.task('karma', ['build'], function(done) {
  var karmaConfig = {
    configFile: __dirname + '/karma.conf.js'
  };

  testSource();

  function testSource() {
    var karma = new Server(karmaConfig, captureError(testCompiled));
    karma.start();
  }

  function testCompiled() {
    process.env.KARMA_TEST_COMPRESSED = true;

    var karma = new Server(karmaConfig, done);
    karma.start();
  }

  function captureError(next) {
    return function(exitCode, errorCode) {
      if (exitCode != 0) {
        console.log("Karma exited with exit code: " + exitCode);
      }
      else {
        next();
      }
    }
  }
});


gulp.task('docs', function() {
  gulp.src(CONFIG.jsFiles)
    .pipe(concat('DOCS.md'))
    .pipe(jsdoc2md())
    .pipe(gulp.dest('./'));
});


// Commits the changes to the demo files to the gh-pages branch
// Currently bugged
gulp.task('update-demo', function(done) {
  git.revParse({args: "--abbrev-ref HEAD", quiet: true}, function(err, hash) {
    var originalBranch = hash;

    git.checkout('gh-pages', function(err) {
      if (err) console.log(err);

      git.checkout(originalBranch, {args: '-- ' + CONFIG.pagesSrc}, function(err) {
        gulp.src(CONFIG.pagesSrc)
          .pipe(git.commit('Automatic update from ' + originalBranch + ''))
          .pipe(function() {
            git.checkout(originalBranch);
            done();
          });
      });
    });
  });
});


gulp.task('watch', ['build-fast'], function() {
  return gulp.watch(CONFIG.allSrc, ['build-fast']);
});


gulp.task('watch-docs', function() {
  return gulp.watch(CONFIG.jsFiles, ['docs']);
});



gulp.task('validate', ['jshint', 'karma']);
gulp.task('default', ['watch']);
