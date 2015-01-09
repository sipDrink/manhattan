var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var bs = require('browser-sync');
var reload = bs.reload;
var IF = require('gulp-if');
var jshint = require('gulp-jshint');
var stylus = require('gulp-stylus');
var jscs = require('gulp-jscs');

var paths = {
  sass: ['./scss/**/*.scss'],
  stylus: ['www/**/*.styl'],
  js: ['www/app/**/*.js']
};

gulp.task('default', ['sass']);

//ionic uses SASS
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('stylus', function() {
  //should 'app.styl' be 'style.styl' to match client?
  return gulp.src(['www/app/app.styl'])
    .pipe(stylus())
    .pipe(gulp.dest('www/css'))
    .pipe(reload({ stream: true }));
});

gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(reload({ stream: true, once: true }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(IF(!bs.active, jshint.reporter('fail')));
});

gulp.task('jscs', function() {
  return gulp.src(paths.js)
    .pipe(jscs())
});

gulp.task('serve', function() {
  bs({
    notify: true,
    server: {
      baseDir: 'www'
    },
    files: ['www/app/**/*.html', 'www/index.html']
  });

  gulp.watch(paths.stylus, ['stylus']);
  gulp.watch(paths.js, ['jshint']);
});

