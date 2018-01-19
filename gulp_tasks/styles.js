/*global process */
/**
 * Task: Styles
 * --------------------------------------------------
 * 2017-05-26
 */

// Dependencies
var pkg /*      */ = require('../package.json');
var gulp /*     */ = require('gulp');
var runSeq /*   */ = require('run-sequence');
// var header = require('gulp-header');
var scsslint /* */ = require('gulp-scss-lint');
var sass /*     */ = require('gulp-sass');
var compass /*  */ = require('gulp-compass');
//var rename       = require('gulp-rename');
//var moment       = require('moment');
var autoprefixer   = require('gulp-autoprefixer');
//var csscomb      = require('gulp-csscomb');
//var combineMq    = require('gulp-combine-mq');
//var minifyCss    = require('gulp-clean-css');
//var banner       = '/*! <%= pkg.title %> | <%= moment().format("MMMM Do YYYY, h:mm:ss A") %> */\n';

// Task
gulp.task('styles', function (cb) {

  // Run tasks synchronously
  return runSeq(
    ['styles-lint'], ['styles-build'],
    cb
  );
});

// Lint Sass
gulp.task('styles-lint', function () {

  return gulp.src('./source/styles/**/*.scss')

  // Lint Sass
  .pipe(scsslint({
    config: './gulp_tasks/conf/sass-lint.yml',
  }));

});

// Build styles
gulp.task('styles-build', function () {

  var pstcss = autoprefixer({
    browsers: pkg.stage < 2 ? ['> 99%'] : ['> 1%', 'last 20 versions', 'ie 11'],
    cascade: true,
    map: false,
    remove: false,
  });

  return gulp.src('./source/styles/*.scss')

  .pipe(compass({
    css: 'build/styles',
    sass: 'source/styles',
  }))

  // Compile Sass
  .pipe(sass({
    outputStyle: 'nested',
  }))

  // Add vendor prefixes
  .pipe(pstcss)
  // Comb CSS
  //.pipe(csscomb({configPath: './gulp_tasks/_css-comb.json'}))
  // Add banner
  //.pipe(header(banner, {
  //  pkg: pkg,
  //  moment: moment
  //}))

  // Save expanded CSS
  .pipe(gulp.dest('./build/styles'))

  // Combine Media Queries
  //.pipe(combineMq());
  // Minify CSS
  //.pipe(minifyCss({ advanced: false, aggressiveMerging: false, debug: true, mediaMerging: false }))
  // Add `.min` suffix
  //.pipe(rename({ suffix: '.min' }))
  // Save compressed CSS
  //.pipe(gulp.dest('./build/styles'))
  ;
});
